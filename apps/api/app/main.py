"""
Marathon API - Main Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, auth, code

app = FastAPI(
    title="Marathon API",
    description="CS Interview Prep Platform Backend",
    version="0.1.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(code.router, prefix="/code", tags=["Code Execution"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to Marathon API", "docs": "/docs"}


