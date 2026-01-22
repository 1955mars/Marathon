# Marathon Task Tracking

> Current implementation progress. Update this file as tasks are completed.
> **Last Updated**: 2026-01-22

---

## 📍 Current Focus

**Phase 0: Project Setup & Foundation** - Complete! 🎉

Next: **Phase 1 - Authentication & User System**

---

## Active Tasks

### Phase 0: Project Setup ✅ COMPLETE
- [x] 0.1 Initialize monorepo structure
- [x] 0.2 Set up development environment
- [x] 0.3 Configure CI/CD ✅
  - [x] GitHub Actions CI workflow (lint, test, build)
  - [x] Deploy workflow (Vercel + Railway)
  - [x] PR checks (semantic titles, size labels)
  - [x] PR template
- [ ] 0.4 Database schema (deferred - needs PostgreSQL)
- [ ] 0.5 Deploy skeleton apps (ready when you push to GitHub)

### Phase 1: Authentication & User System (NEXT)
- [ ] 1.1 Implement GitHub OAuth
- [ ] 1.2 Create user profile page
- [ ] 1.3 Database: User model

---

## Completed Tasks

### Phase 0.3 - CI/CD Setup (2026-01-22)
- Created `.github/workflows/ci.yml` - Runs lint, typecheck, build for all packages
- Created `.github/workflows/deploy.yml` - Auto-deploy to Vercel/Railway on main
- Created `.github/workflows/pr-checks.yml` - Semantic PR titles, size labels
- Created `.github/pull_request_template.md` - Consistent PR descriptions
- Initialized git repo and made first commit

### Phase 0.2 - Development Environment (2026-01-22)
- Created `docker-compose.yml` with PostgreSQL 16 and Redis 7
- Created `.env.example` files for API and web
- Installed FastAPI dependencies in Python venv
- Started API server at http://localhost:8000
- Created custom Marathon landing page

### Phase 0.1 - Monorepo Structure (2026-01-22)
- Created Next.js app at `apps/web/`
- Created FastAPI app at `apps/api/`
- Created shared types package at `packages/shared/`
- Set up npm workspaces configuration

---

## Running Services

| Service | URL | Status |
|---------|-----|--------|
| Frontend (Next.js) | http://localhost:3000 | 🟢 Running |
| Backend (FastAPI) | http://localhost:8000 | 🟢 Running |
| API Docs (Swagger) | http://localhost:8000/docs | 🟢 Available |

---

## GitHub Actions Workflows

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Push/PR to main | Lint, typecheck, test, build |
| `deploy.yml` | Push to main | Deploy to Vercel & Railway |
| `pr-checks.yml` | PR opened | Semantic title check, size label |

---

## Secrets Needed for Deployment

Add these to your GitHub repo secrets:
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `RAILWAY_TOKEN` - Railway API token

---

## Quick Start Commands
```bash
# Frontend (Next.js)
cd apps/web && npm run dev

# Backend (FastAPI)
cd apps/api
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

---

## Changelog

| Date | Update |
|------|--------|
| 2026-01-22 | Phase 0.3 complete - CI/CD workflows, git initialized |
| 2026-01-22 | Phase 0.2 complete - Docker config, env files, landing page |
| 2026-01-22 | Phase 0.1 complete - Monorepo structure initialized |
| 2026-01-21 | Project initialized, scoping complete |
