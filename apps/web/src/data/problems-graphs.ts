/**
 * Graph problems
 */
import { Problem } from "./problems";

export const graphProblems: Problem[] = [
    {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        pattern: "Graphs",
        tags: ["graph", "dfs", "bfs", "matrix"],
        description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
        examples: [
            { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: "2" },
        ],
        constraints: ["1 <= m, n <= 300"],
        solutions: {
            python: `def num_islands(grid):
    """DFS to sink each island."""
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count

# Test
grid = [["1","1","0"],["1","1","0"],["0","0","1"]]
print(f"Islands: {num_islands(grid)}")`,
            cpp: `#include <vector>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0')
            return;
        grid[r][c] = '0';
        dfs(grid, r+1, c);
        dfs(grid, r-1, c);
        dfs(grid, r, c+1);
        dfs(grid, r, c-1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
};`,
        },
        explanation: `## DFS Flood Fill
When we find land, increment count and sink the entire island using DFS.`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
    },
    {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        pattern: "Graphs",
        tags: ["graph", "dfs", "bfs", "hash-map"],
        description: "Given a reference to a node in a connected undirected graph, return a deep copy.",
        examples: [
            { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
        ],
        constraints: ["0 <= Number of nodes <= 100"],
        solutions: {
            python: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors else []

def clone_graph(node):
    """DFS with hash map to track cloned nodes."""
    if not node:
        return None
    
    old_to_new = {}
    
    def dfs(node):
        if node in old_to_new:
            return old_to_new[node]
        
        copy = Node(node.val)
        old_to_new[node] = copy
        
        for neighbor in node.neighbors:
            copy.neighbors.append(dfs(neighbor))
        
        return copy
    
    return dfs(node)

print("Clone with hashmap to handle cycles")`,
            cpp: `class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int v) : val(v) {}
};

class Solution {
    unordered_map<Node*, Node*> visited;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (visited.count(node)) return visited[node];
        
        Node* copy = new Node(node->val);
        visited[node] = copy;
        
        for (Node* neighbor : node->neighbors) {
            copy->neighbors.push_back(cloneGraph(neighbor));
        }
        return copy;
    }
};`,
        },
        explanation: `## DFS with Memoization
Use hash map to track already-cloned nodes to handle cycles.`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
    },
    {
        id: "pacific-atlantic-water-flow",
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        pattern: "Graphs",
        tags: ["graph", "dfs", "bfs", "matrix"],
        description: "Find all cells where water can flow to both Pacific and Atlantic oceans.",
        examples: [
            { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
        ],
        constraints: ["1 <= m, n <= 200"],
        solutions: {
            python: `def pacific_atlantic(heights):
    """DFS from ocean borders, find intersection."""
    if not heights:
        return []
    
    rows, cols = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()
    
    def dfs(r, c, visited, prev_height):
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            (r, c) in visited or heights[r][c] < prev_height):
            return
        
        visited.add((r, c))
        for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
            dfs(r+dr, c+dc, visited, heights[r][c])
    
    # DFS from Pacific (top and left)
    for c in range(cols):
        dfs(0, c, pacific, heights[0][c])
    for r in range(rows):
        dfs(r, 0, pacific, heights[r][0])
    
    # DFS from Atlantic (bottom and right)
    for c in range(cols):
        dfs(rows-1, c, atlantic, heights[rows-1][c])
    for r in range(rows):
        dfs(r, cols-1, atlantic, heights[r][cols-1])
    
    return list(pacific & atlantic)

print("Find cells reachable from both oceans")`,
            cpp: `vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int m = heights.size(), n = heights[0].size();
    vector<vector<bool>> pacific(m, vector<bool>(n)), atlantic(m, vector<bool>(n));
    
    function<void(int, int, vector<vector<bool>>&)> dfs = [&](int r, int c, vector<vector<bool>>& visited) {
        visited[r][c] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
                !visited[nr][nc] && heights[nr][nc] >= heights[r][c])
                dfs(nr, nc, visited);
        }
    };
    
    for (int i = 0; i < m; i++) { dfs(i, 0, pacific); dfs(i, n-1, atlantic); }
    for (int j = 0; j < n; j++) { dfs(0, j, pacific); dfs(m-1, j, atlantic); }
    
    vector<vector<int>> result;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (pacific[i][j] && atlantic[i][j])
                result.push_back({i, j});
    return result;
}`,
        },
        explanation: `## Reverse Flow DFS
Instead of checking each cell, start from oceans and flow uphill. Find intersection.`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
    },
    {
        id: "course-schedule",
        title: "Course Schedule",
        difficulty: "Medium",
        pattern: "Graphs",
        tags: ["graph", "dfs", "topological-sort"],
        description: "Given numCourses and prerequisites, determine if all courses can be finished (no cycles).",
        examples: [
            { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
            { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
        ],
        constraints: ["1 <= numCourses <= 2000"],
        solutions: {
            python: `def can_finish(numCourses, prerequisites):
    """Detect cycle using DFS with states."""
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * numCourses
    
    def has_cycle(course):
        if state[course] == 1:  # Cycle!
            return True
        if state[course] == 2:  # Already processed
            return False
        
        state[course] = 1
        for prereq in graph[course]:
            if has_cycle(prereq):
                return True
        state[course] = 2
        return False
    
    for course in range(numCourses):
        if has_cycle(course):
            return False
    return True

print(can_finish(2, [[1,0]]))  # True`,
            cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    for (auto& p : prerequisites)
        graph[p[0]].push_back(p[1]);
    
    vector<int> state(numCourses, 0);  // 0: unvisited, 1: visiting, 2: visited
    
    function<bool(int)> hasCycle = [&](int course) {
        if (state[course] == 1) return true;
        if (state[course] == 2) return false;
        
        state[course] = 1;
        for (int prereq : graph[course])
            if (hasCycle(prereq)) return true;
        state[course] = 2;
        return false;
    };
    
    for (int i = 0; i < numCourses; i++)
        if (hasCycle(i)) return false;
    return true;
}`,
        },
        explanation: `## Cycle Detection
Use three states: unvisited, visiting (in current path), visited.
Finding a "visiting" node means cycle.`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
    },
    {
        id: "word-ladder",
        title: "Word Ladder",
        difficulty: "Hard",
        pattern: "Graphs",
        tags: ["graph", "bfs"],
        description: "Given beginWord, endWord, and wordList, find the shortest transformation sequence length.",
        examples: [
            { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" },
        ],
        constraints: ["1 <= wordList.length <= 5000"],
        solutions: {
            python: `from collections import deque

def ladder_length(beginWord, endWord, wordList):
    """BFS to find shortest path."""
    word_set = set(wordList)
    if endWord not in word_set:
        return 0
    
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    
    while queue:
        word, length = queue.popleft()
        
        if word == endWord:
            return length
        
        # Try changing each character
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, length + 1))
    
    return 0

print(ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))`,
            cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;
    
    queue<pair<string, int>> q;
    q.push({beginWord, 1});
    unordered_set<string> visited = {beginWord};
    
    while (!q.empty()) {
        auto [word, len] = q.front(); q.pop();
        if (word == endWord) return len;
        
        for (int i = 0; i < word.size(); i++) {
            string next = word;
            for (char c = 'a'; c <= 'z'; c++) {
                next[i] = c;
                if (wordSet.count(next) && !visited.count(next)) {
                    visited.insert(next);
                    q.push({next, len + 1});
                }
            }
        }
    }
    return 0;
}`,
        },
        explanation: `## BFS for Shortest Path
Each word is a node, edges connect words differing by one character.
BFS finds shortest path.`,
        timeComplexity: "O(M² * N)",
        spaceComplexity: "O(M * N)",
    },
];
