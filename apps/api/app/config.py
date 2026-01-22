"""
Application configuration using Pydantic Settings
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database
    database_url: str = "postgresql://marathon:marathon_dev@localhost:5432/marathon"
    
    # Redis
    redis_url: str = "redis://localhost:6379"
    
    # GitHub OAuth
    github_client_id: str = ""
    github_client_secret: str = ""
    
    # JWT
    jwt_secret: str = "your-super-secret-jwt-key-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24
    
    # URLs
    frontend_url: str = "http://localhost:3000"
    api_url: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
