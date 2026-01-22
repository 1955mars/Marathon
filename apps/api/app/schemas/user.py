"""
User schemas for API requests/responses
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema."""
    username: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    """Schema for creating a user."""
    github_id: str


class User(UserBase):
    """User response schema."""
    id: str
    github_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserProfile(BaseModel):
    """User profile for frontend."""
    id: str
    username: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None
    github_url: str
