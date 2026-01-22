"""
Authentication utilities - JWT token handling
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from pydantic import BaseModel

from app.config import get_settings


class TokenData(BaseModel):
    """Data stored in JWT token."""
    user_id: str
    username: str
    email: Optional[str] = None


class Token(BaseModel):
    """Token response model."""
    access_token: str
    token_type: str = "bearer"


def create_access_token(data: TokenData) -> str:
    """Create a JWT access token."""
    settings = get_settings()
    
    expire = datetime.utcnow() + timedelta(hours=settings.jwt_expiration_hours)
    to_encode = {
        "sub": data.user_id,
        "username": data.username,
        "email": data.email,
        "exp": expire,
    }
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.jwt_secret, 
        algorithm=settings.jwt_algorithm
    )
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenData]:
    """Verify and decode a JWT token."""
    settings = get_settings()
    
    try:
        payload = jwt.decode(
            token, 
            settings.jwt_secret, 
            algorithms=[settings.jwt_algorithm]
        )
        user_id: str = payload.get("sub")
        username: str = payload.get("username")
        email: str = payload.get("email")
        
        if user_id is None or username is None:
            return None
            
        return TokenData(user_id=user_id, username=username, email=email)
    except JWTError:
        return None
