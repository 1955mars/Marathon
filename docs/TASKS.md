# Marathon Task Tracking

> Current implementation progress. Update this file as tasks are completed.
> **Last Updated**: 2026-01-22

---

## 📍 Current Focus

**Phase 1: Authentication & User System** - In Progress 🔄

Needs: GitHub OAuth App credentials to test login flow

---

## Active Tasks

### Phase 1: Authentication & User System
- [x] 1.1 Implement GitHub OAuth ✅
  - [x] API: Config with pydantic-settings
  - [x] API: JWT token creation/verification
  - [x] API: GitHub OAuth router (login, callback, me, logout)
  - [x] Frontend: Auth utilities (token storage)
  - [x] Frontend: OAuth callback page
  - [x] Frontend: Updated landing page with login button
- [x] 1.2 Create user profile page ✅
  - [x] Dashboard with user info display
  - [x] Stats grid (placeholder)
  - [x] Quick actions navigation
- [ ] 1.3 Database: User model (needs PostgreSQL)

---

## To Test OAuth Flow

1. Create GitHub OAuth App at https://github.com/settings/developers
2. Set callback URL to: `http://localhost:8000/auth/callback`
3. Copy Client ID and Client Secret to `apps/api/.env`
4. Restart the API server
5. Click "Get Started" on the landing page

---

## Completed Tasks

### Phase 1.1-1.2 - GitHub OAuth & Dashboard (2026-01-22)
- Created `app/config.py` - Pydantic settings for env vars
- Created `app/auth.py` - JWT token utilities
- Created `app/routers/auth.py` - OAuth endpoints
- Created `src/lib/auth.ts` - Frontend auth utilities
- Created `src/app/auth/callback/page.tsx` - OAuth callback handler
- Created `src/app/dashboard/page.tsx` - User dashboard
- Updated landing page with login integration

### Phase 0.3 - CI/CD Setup (2026-01-22)
- Created GitHub Actions workflows
- Initialized git repo and pushed to GitHub

### Phase 0.2 - Development Environment (2026-01-22)
- Docker Compose, env files, landing page

### Phase 0.1 - Monorepo Structure (2026-01-22)
- Next.js + FastAPI + shared types

---

## Running Services

| Service | URL | Status |
|---------|-----|--------|
| Frontend (Next.js) | http://localhost:3000 | 🟢 Running |
| Backend (FastAPI) | http://localhost:8000 | 🟢 Running |
| API Docs (Swagger) | http://localhost:8000/docs | 🟢 Available |

---

## New API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/login` | Redirects to GitHub OAuth |
| GET | `/auth/callback` | Handles OAuth callback |
| GET | `/auth/me` | Get current user profile |
| POST | `/auth/logout` | Logout (client clears token) |

---

## Quick Start Commands
```bash
# Frontend
cd apps/web && npm run dev

# Backend
cd apps/api
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

---

## Changelog

| Date | Update |
|------|--------|
| 2026-01-22 | Phase 1.1-1.2 - GitHub OAuth and Dashboard implemented |
| 2026-01-22 | Phase 0.3 - CI/CD, pushed to GitHub |
| 2026-01-22 | Phase 0.2 - Docker, env, landing page |
| 2026-01-22 | Phase 0.1 - Monorepo initialized |
