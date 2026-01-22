# Marathon 🏃

> A comprehensive CS interview preparation platform for graduate students transitioning to software engineering roles.

## Vision

Marathon is a **HackerRank-style learning platform** that combines rigorous CS curriculum with modern, engaging learning experiences. Students don't just *know* the material—they *feel prepared and confident* for any software engineering interview.

## Key Features

| Feature | Description |
|---------|-------------|
| **Integrated Code Editor** | In-browser IDE for Python and C++ with test execution |
| **Step-Based Curriculum** | 5 Acts covering CS fundamentals to career skills |
| **16 Progressive Projects** | Full source code with walkthroughs, pushed to GitHub |
| **LeetCode Library** | Save, tag, and track problems with spaced repetition |
| **AI Tutor** | Socratic-style guidance through questions |
| **Gamification** | Skill trees, streaks, badges, "Ready for Interview" score |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js + React |
| Backend | Python (FastAPI) |
| Database | PostgreSQL + Redis |
| Code Execution | Docker sandbox (Judge0) |
| Auth | GitHub OAuth |
| Deployment | Vercel + Railway |

## Project Structure

```
Marathon/
├── docs/                    # Project documentation
│   ├── SCOPING.md          # Full curriculum & feature scope
│   ├── IMPLEMENTATION.md   # Phased implementation roadmap
│   └── TASKS.md            # Current task tracking
├── apps/
│   ├── web/                # Next.js frontend
│   └── api/                # FastAPI backend
├── packages/
│   └── shared/             # Shared types/utilities
└── README.md               # This file
```

## Current Status

📍 **Phase 0: Project Setup** - Just starting!

See [docs/TASKS.md](docs/TASKS.md) for current progress.

## Documentation

- [Scoping Document](docs/SCOPING.md) - Full curriculum, features, and experiential design
- [Implementation Plan](docs/IMPLEMENTATION.md) - Phased roadmap with detailed steps
- [Task Tracking](docs/TASKS.md) - Current progress and next steps

## Getting Started

*Coming soon after Phase 0 setup*

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/Marathon.git

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## License

MIT
