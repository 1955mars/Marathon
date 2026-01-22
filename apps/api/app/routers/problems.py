"""
LeetCode Problem Library Router
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

router = APIRouter()

# In-memory storage (replace with database later)
problems_db: dict = {}


class ProblemCreate(BaseModel):
    title: str
    url: str
    difficulty: str  # Easy, Medium, Hard
    tags: List[str] = []
    pattern: Optional[str] = None
    notes: Optional[str] = None
    solution_code: Optional[str] = None
    language: str = "python"


class Problem(BaseModel):
    id: str
    title: str
    url: str
    difficulty: str
    tags: List[str]
    pattern: Optional[str]
    notes: Optional[str]
    solution_code: Optional[str]
    language: str
    created_at: datetime
    last_practiced: Optional[datetime] = None
    practice_count: int = 0
    confidence: int = 0
    next_review: Optional[datetime] = None


class ProblemUpdate(BaseModel):
    title: Optional[str] = None
    tags: Optional[List[str]] = None
    pattern: Optional[str] = None
    notes: Optional[str] = None
    solution_code: Optional[str] = None
    confidence: Optional[int] = None


PATTERNS = [
    "Two Pointers", "Sliding Window", "Fast & Slow Pointers",
    "Merge Intervals", "Cyclic Sort", "In-place Reversal",
    "Tree BFS", "Tree DFS", "Two Heaps", "Subsets",
    "Modified Binary Search", "Bitwise XOR", "Top K Elements",
    "K-way Merge", "Topological Sort", "Dynamic Programming",
    "Backtracking", "Graph", "Trie", "Union Find",
]


@router.get("/patterns")
async def get_patterns():
    return {"patterns": PATTERNS}


@router.post("/seed")
async def seed_problems(user_id: str = "default"):
    """Seed the library with top 100+ LeetCode problems."""
    from app.data.seed_problems import TOP_100_PROBLEMS
    
    if user_id not in problems_db:
        problems_db[user_id] = {}
    
    added = 0
    for p in TOP_100_PROBLEMS:
        exists = any(e.get("url") == p["url"] for e in problems_db[user_id].values())
        if exists:
            continue
            
        problem_id = str(uuid.uuid4())
        problems_db[user_id][problem_id] = {
            "id": problem_id,
            "title": p["title"],
            "url": p["url"],
            "difficulty": p["difficulty"],
            "tags": p.get("tags", []),
            "pattern": p.get("pattern"),
            "notes": None,
            "solution_code": None,
            "language": "python",
            "created_at": datetime.utcnow().isoformat(),
            "last_practiced": None,
            "practice_count": 0,
            "confidence": 0,
            "next_review": None,
        }
        added += 1
    
    return {"message": f"Seeded {added} problems", "total": len(problems_db[user_id])}


@router.post("/", response_model=Problem)
async def create_problem(problem: ProblemCreate, user_id: str = "default"):
    problem_id = str(uuid.uuid4())
    new_problem = Problem(
        id=problem_id,
        title=problem.title,
        url=problem.url,
        difficulty=problem.difficulty,
        tags=problem.tags,
        pattern=problem.pattern,
        notes=problem.notes,
        solution_code=problem.solution_code,
        language=problem.language,
        created_at=datetime.utcnow(),
    )
    if user_id not in problems_db:
        problems_db[user_id] = {}
    problems_db[user_id][problem_id] = new_problem.model_dump()
    return new_problem


@router.get("/")
async def get_problems(
    user_id: str = "default",
    difficulty: Optional[str] = None,
    pattern: Optional[str] = None,
    tag: Optional[str] = None,
):
    if user_id not in problems_db:
        return {"problems": [], "total": 0}
    
    problems = list(problems_db[user_id].values())
    
    if difficulty:
        problems = [p for p in problems if p["difficulty"] == difficulty]
    if pattern:
        problems = [p for p in problems if p.get("pattern") == pattern]
    if tag:
        problems = [p for p in problems if tag in p.get("tags", [])]
    
    problems.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return {"problems": problems, "total": len(problems)}


@router.get("/review")
async def get_problems_for_review(user_id: str = "default"):
    if user_id not in problems_db:
        return {"problems": [], "total": 0}
    
    now = datetime.utcnow()
    problems = list(problems_db[user_id].values())
    due = [p for p in problems if not p.get("next_review") or 
           datetime.fromisoformat(p["next_review"]) <= now]
    due.sort(key=lambda x: x.get("confidence", 0))
    return {"problems": due[:10], "total": len(due)}


@router.get("/{problem_id}")
async def get_problem(problem_id: str, user_id: str = "default"):
    if user_id not in problems_db or problem_id not in problems_db[user_id]:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problems_db[user_id][problem_id]


@router.put("/{problem_id}")
async def update_problem(problem_id: str, update: ProblemUpdate, user_id: str = "default"):
    if user_id not in problems_db or problem_id not in problems_db[user_id]:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    problem = problems_db[user_id][problem_id]
    for field, value in update.model_dump(exclude_unset=True).items():
        if value is not None:
            problem[field] = value
    return problem


@router.post("/{problem_id}/practice")
async def record_practice(problem_id: str, confidence: int, user_id: str = "default"):
    if user_id not in problems_db or problem_id not in problems_db[user_id]:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    if confidence < 0 or confidence > 5:
        raise HTTPException(status_code=400, detail="Confidence must be 0-5")
    
    problem = problems_db[user_id][problem_id]
    problem["practice_count"] = problem.get("practice_count", 0) + 1
    problem["last_practiced"] = datetime.utcnow().isoformat()
    problem["confidence"] = confidence
    
    from datetime import timedelta
    intervals = {0: 1, 1: 1, 2: 2, 3: 4, 4: 7, 5: 14}
    next_review = datetime.utcnow() + timedelta(days=intervals.get(confidence, 1))
    problem["next_review"] = next_review.isoformat()
    
    return {"message": "Practice recorded", "next_review": problem["next_review"]}


@router.delete("/{problem_id}")
async def delete_problem(problem_id: str, user_id: str = "default"):
    if user_id not in problems_db or problem_id not in problems_db[user_id]:
        raise HTTPException(status_code=404, detail="Problem not found")
    del problems_db[user_id][problem_id]
    return {"message": "Problem deleted"}


@router.get("/stats/summary")
async def get_stats(user_id: str = "default"):
    if user_id not in problems_db:
        return {"total": 0, "by_difficulty": {"Easy": 0, "Medium": 0, "Hard": 0}, "by_pattern": {}}
    
    problems = list(problems_db[user_id].values())
    by_difficulty = {"Easy": 0, "Medium": 0, "Hard": 0}
    by_pattern = {}
    
    for p in problems:
        by_difficulty[p.get("difficulty", "Easy")] = by_difficulty.get(p.get("difficulty", "Easy"), 0) + 1
        if p.get("pattern"):
            by_pattern[p["pattern"]] = by_pattern.get(p["pattern"], 0) + 1
    
    return {"total": len(problems), "by_difficulty": by_difficulty, "by_pattern": by_pattern}
