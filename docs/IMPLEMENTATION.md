# Marathon Implementation Roadmap

> This document tracks the phased implementation of the Marathon platform.
> **Last Updated**: 2026-01-21

---

## Overview

| Phase | Focus | Duration | Status |
|-------|-------|----------|--------|
| 0 | Project Setup | 1 week | 🔄 In Progress |
| 1 | Auth & Users | 1 week | ⏳ Pending |
| 2 | Curriculum System | 2 weeks | ⏳ Pending |
| 3 | Code Editor | 2 weeks | ⏳ Pending |
| 4 | LeetCode Library | 1 week | ⏳ Pending |
| 5 | Projects | 2 weeks | ⏳ Pending |
| 6 | Gamification | 1 week | ⏳ Pending |
| 7 | AI Tutor | 2 weeks | ⏳ Pending |
| 8 | Content | 4 weeks | ⏳ Pending |
| 9 | Polish | 2 weeks | ⏳ Pending |

---

## Phase 0: Project Setup & Foundation (Week 1)
*Goal: Establish project structure, tooling, and basic infrastructure.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 0.1 | Initialize monorepo structure (`apps/web`, `apps/api`, `packages/shared`) | ⏳ |
| 0.2 | Set up dev environment (Docker Compose for PostgreSQL, Redis) | ⏳ |
| 0.3 | Configure CI/CD (GitHub Actions) | ⏳ |
| 0.4 | Set up initial database schema | ⏳ |
| 0.5 | Deploy skeleton apps (Vercel + Railway) | ⏳ |

### Deliverable
Empty but deployable app with CI/CD pipeline

---

## Phase 1: Authentication & User System (Week 2)
*Goal: Users can sign up, log in, and have persistent sessions.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 1.1 | Implement GitHub OAuth (login/logout, JWT sessions) | ⏳ |
| 1.2 | Create user profile page | ⏳ |
| 1.3 | Database: User model | ⏳ |

### Deliverable
Users can log in with GitHub and see their profile

---

## Phase 2: Curriculum Content System (Week 3-4)
*Goal: Render learning content (Acts, Scenes, Steps).*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 2.1 | Design content data model (Acts → Scenes → Steps → Tasks) | ⏳ |
| 2.2 | Build curriculum navigation UI (sidebar, progress indicators) | ⏳ |
| 2.3 | Create Step viewer component (render MDX) | ⏳ |
| 2.4 | Populate Act 0 content (Python & C++ Mastery) | ⏳ |
| 2.5 | Implement step completion tracking | ⏳ |

### Deliverable
Users can browse Act 0 curriculum and mark steps complete

---

## Phase 3: Code Editor & Execution (Week 5-6)
*Goal: Users can write and run Python/C++ code in-browser.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 3.1 | Integrate Monaco Editor (syntax highlighting, autocomplete) | ⏳ |
| 3.2 | Set up code execution backend (Judge0 or Docker sandbox) | ⏳ |
| 3.3 | Build code runner UI (input/output panels, run button) | ⏳ |
| 3.4 | Implement test case system (expected vs actual) | ⏳ |
| 3.5 | Add coding exercises to curriculum | ⏳ |

### Deliverable
Users can write and execute code with test validation

---

## Phase 4: LeetCode Problem Library (Week 7)
*Goal: Users can add, organize, and track LeetCode problems.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 4.1 | Design Problem model (title, url, difficulty, tags, pattern, notes, status) | ⏳ |
| 4.2 | Build problem CRUD UI (add form, list with filters) | ⏳ |
| 4.3 | Implement tagging system (pattern tags, custom tags) | ⏳ |
| 4.4 | Add problem status tracking (Not Started → Attempted → Solved) | ⏳ |
| 4.5 | Spaced repetition integration | ⏳ |

### Deliverable
Users can manage their LeetCode problem library

---

## Phase 5: Projects System (Week 8-9)
*Goal: Display projects with full code, walkthroughs, and GitHub push.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 5.1 | Design Project model (title, act, source_code, walkthrough, language) | ⏳ |
| 5.2 | Build project viewer UI (file tree, walkthrough panel) | ⏳ |
| 5.3 | Implement "Build Along" mode (step-by-step checkpoints) | ⏳ |
| 5.4 | GitHub integration (push project, auto-generate README) | ⏳ |
| 5.5 | Populate first 4 projects (P0a, P0b, P1, P2) | ⏳ |

### Deliverable
Users can view projects, build along, and push to GitHub

---

## Phase 6: Progress Dashboard & Gamification (Week 10)
*Goal: Visualize progress with skill trees, streaks, and badges.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 6.1 | Build progress dashboard (completion %, per-Act progress) | ⏳ |
| 6.2 | Implement skill tree visualization | ⏳ |
| 6.3 | Add streak tracking (daily activity, calendar heatmap) | ⏳ |
| 6.4 | Create badge/achievement system | ⏳ |
| 6.5 | "Ready for Interview" score | ⏳ |

### Deliverable
Users see comprehensive progress visualization

---

## Phase 7: AI Tutor Integration (Week 11-12)
*Goal: Socratic AI tutor that guides learning through questions.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 7.1 | Design tutor interaction model (triggers, conversation history) | ⏳ |
| 7.2 | Integrate LLM API (Gemini/OpenAI, Socratic system prompt) | ⏳ |
| 7.3 | Build chat UI (slide-out panel, message history) | ⏳ |
| 7.4 | Implement "Explain It To Me" feature | ⏳ |
| 7.5 | Add reverse debugging challenges | ⏳ |

### Deliverable
AI tutor helps users learn through guided questioning

---

## Phase 8: Content Population (Week 13-16)
*Goal: Populate all curriculum content and projects.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 8.1 | Act 1 content (CS Foundations) | ⏳ |
| 8.2 | Act 2 content (Systems) | ⏳ |
| 8.3 | Act 3 content (System Design) | ⏳ |
| 8.4 | Act 4 content (Interview Bridge) | ⏳ |
| 8.5 | Remaining projects (P3-P14) | ⏳ |
| 8.6 | Track-specific content (Web, Systems, ML/DS) | ⏳ |

### Deliverable
Full curriculum available

---

## Phase 9: Polish & Launch Prep (Week 17-18)
*Goal: Bug fixes, performance, and launch readiness.*

### Steps
| Step | Description | Status |
|------|-------------|--------|
| 9.1 | Performance optimization (lazy loading, caching) | ⏳ |
| 9.2 | Mobile responsiveness | ⏳ |
| 9.3 | Error handling & logging | ⏳ |
| 9.4 | User testing & feedback | ⏳ |
| 9.5 | Landing page & onboarding flow | ⏳ |
| 9.6 | Documentation | ⏳ |

### Deliverable
Production-ready platform

---

## Changelog

| Date | Update |
|------|--------|
| 2026-01-21 | Initial implementation plan created |
