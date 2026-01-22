"""
GitHub OAuth authentication router
"""
import httpx
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import RedirectResponse
from typing import Optional
import uuid

from app.config import get_settings
from app.auth import create_access_token, TokenData, Token

router = APIRouter()

# In-memory user store (replace with database in Phase 0.4)
users_db: dict = {}


@router.get("/login")
async def github_login():
    """Redirect to GitHub OAuth authorization page."""
    settings = get_settings()
    
    if not settings.github_client_id:
        raise HTTPException(
            status_code=500, 
            detail="GitHub OAuth not configured. Set GITHUB_CLIENT_ID in .env"
        )
    
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.github_client_id}"
        f"&redirect_uri={settings.api_url}/auth/callback"
        f"&scope=read:user user:email"
    )
    
    return RedirectResponse(url=github_auth_url)


@router.get("/callback")
async def github_callback(code: str):
    """Handle GitHub OAuth callback."""
    settings = get_settings()
    
    # Exchange code for access token
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": settings.github_client_id,
                "client_secret": settings.github_client_secret,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )
        
        token_data = token_response.json()
        
        if "error" in token_data:
            raise HTTPException(
                status_code=400,
                detail=f"GitHub OAuth error: {token_data.get('error_description', token_data['error'])}"
            )
        
        access_token = token_data.get("access_token")
        
        # Get user info from GitHub
        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
        )
        
        github_user = user_response.json()
        
        # Get user email (might be private)
        email_response = await client.get(
            "https://api.github.com/user/emails",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
        )
        
        emails = email_response.json()
        primary_email = next(
            (e["email"] for e in emails if e.get("primary")),
            None
        ) if isinstance(emails, list) else None
    
    # Create or update user in our database
    github_id = str(github_user["id"])
    
    if github_id not in users_db:
        users_db[github_id] = {
            "id": str(uuid.uuid4()),
            "github_id": github_id,
            "username": github_user["login"],
            "email": primary_email,
            "avatar_url": github_user.get("avatar_url"),
        }
    else:
        # Update existing user info
        users_db[github_id].update({
            "username": github_user["login"],
            "email": primary_email or users_db[github_id].get("email"),
            "avatar_url": github_user.get("avatar_url"),
        })
    
    user = users_db[github_id]
    
    # Create JWT token
    token = create_access_token(
        TokenData(
            user_id=user["id"],
            username=user["username"],
            email=user.get("email"),
        )
    )
    
    # Redirect to frontend with token
    redirect_url = f"{settings.frontend_url}/auth/callback?token={token}"
    return RedirectResponse(url=redirect_url)


@router.get("/me")
async def get_current_user(authorization: Optional[str] = None):
    """Get current user from JWT token."""
    from app.auth import verify_token
    
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.split(" ")[1]
    token_data = verify_token(token)
    
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Find user in database
    for user in users_db.values():
        if user["id"] == token_data.user_id:
            return {
                "id": user["id"],
                "username": user["username"],
                "email": user.get("email"),
                "avatar_url": user.get("avatar_url"),
                "github_url": f"https://github.com/{user['username']}",
            }
    
    raise HTTPException(status_code=404, detail="User not found")


@router.post("/logout")
async def logout():
    """Logout endpoint (client should clear token)."""
    return {"message": "Logged out successfully"}
