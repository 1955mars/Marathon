/**
 * Tree problems
 */
import { Problem } from "./problems";

export const treeProblems: Problem[] = [
    {
        id: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        pattern: "Trees",
        tags: ["tree", "dfs", "bfs"],
        description: "Given the root of a binary tree, invert the tree and return its root.",
        examples: [
            { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
        ],
        constraints: ["0 <= Number of nodes <= 100"],
        solutions: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    """Recursively swap left and right children."""
    if not root:
        return None
    
    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)
    
    return root

print("Swap left and right at each node")`,
            cpp: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}

int main() {
    cout << "Invert binary tree" << endl;
    return 0;
}`,
        },
        explanation: `## DFS Approach
At each node, swap its left and right children, then recurse.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "maximum-depth-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        pattern: "Trees",
        tags: ["tree", "dfs", "bfs"],
        description: "Given the root of a binary tree, return its maximum depth.",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "3" },
        ],
        constraints: ["0 <= Number of nodes <= 10^4"],
        solutions: {
            python: `def max_depth(root):
    """DFS: max(left, right) + 1"""
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

print("Max depth = 1 + max(left depth, right depth)")`,
            cpp: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}

int main() {
    cout << "Max depth" << endl;
    return 0;
}`,
        },
        explanation: `## Recursive DFS
Depth = 1 + max depth of children.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        pattern: "Trees",
        tags: ["tree", "dfs", "bfs"],
        description: "Given roots of two binary trees, check if they are the same.",
        examples: [
            { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
        ],
        constraints: ["0 <= Number of nodes <= 100"],
        solutions: {
            python: `def is_same_tree(p, q):
    """Both null, both have same value, and subtrees match."""
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.val == q.val and 
            is_same_tree(p.left, q.left) and 
            is_same_tree(p.right, q.right))

print("Check values and structure match")`,
            cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && 
           isSameTree(p->left, q->left) && 
           isSameTree(p->right, q->right);
}`,
        },
        explanation: `## Compare Structure and Values
Both null → same. One null → different. Otherwise compare values and recurse.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "subtree-of-another-tree",
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        pattern: "Trees",
        tags: ["tree", "dfs"],
        description: "Given roots of two trees root and subRoot, return true if there is a subtree of root with the same structure and values as subRoot.",
        examples: [
            { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
        ],
        constraints: ["1 <= Number of nodes <= 2000"],
        solutions: {
            python: `def is_subtree(root, subRoot):
    """Check if any node matches the subtree."""
    def is_same(p, q):
        if not p and not q: return True
        if not p or not q: return False
        return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)
    
    if not root:
        return False
    if is_same(root, subRoot):
        return True
    return is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)

print("Check if subtree matches at any node")`,
            cpp: `bool isSame(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && isSame(p->left, q->left) && isSame(p->right, q->right);
}

bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    if (!root) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}`,
        },
        explanation: `## Check at Every Node
For each node in root, check if it's identical to subRoot.`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "lowest-common-ancestor",
        title: "Lowest Common Ancestor of BST",
        difficulty: "Medium",
        pattern: "Trees",
        tags: ["tree", "bst", "dfs"],
        description: "Given a BST and two nodes, find their lowest common ancestor.",
        examples: [
            { input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", output: "6" },
        ],
        constraints: ["All node values are unique"],
        solutions: {
            python: `def lowest_common_ancestor(root, p, q):
    """Use BST property: left < root < right."""
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root  # Split point is LCA

print("LCA is where p and q split")`,
            cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val)
            root = root->left;
        else if (p->val > root->val && q->val > root->val)
            root = root->right;
        else
            return root;
    }
    return nullptr;
}`,
        },
        explanation: `## BST Property
If both p and q are smaller, go left. If both larger, go right. Otherwise, current node is LCA.`,
        timeComplexity: "O(h)",
        spaceComplexity: "O(1)",
    },
    {
        id: "binary-tree-level-order",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        pattern: "Trees",
        tags: ["tree", "bfs"],
        description: "Return the level order traversal of a binary tree (nodes grouped by level).",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
        ],
        constraints: ["0 <= Number of nodes <= 2000"],
        solutions: {
            python: `from collections import deque

def level_order(root):
    """BFS with level tracking."""
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        
        result.append(level)
    
    return result

print("BFS with level grouping")`,
            cpp: `#include <queue>
#include <vector>
using namespace std;

vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}`,
        },
        explanation: `## BFS with Level Grouping
Process all nodes at current level before moving to next.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "validate-bst",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        pattern: "Trees",
        tags: ["tree", "bst", "dfs"],
        description: "Determine if a binary tree is a valid BST.",
        examples: [
            { input: "root = [2,1,3]", output: "true" },
            { input: "root = [5,1,4,null,null,3,6]", output: "false" },
        ],
        constraints: ["1 <= Number of nodes <= 10^4"],
        solutions: {
            python: `def is_valid_bst(root):
    """Track valid range for each node."""
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))

print("Each node must be within valid range")`,
            cpp: `bool validate(TreeNode* node, long minVal, long maxVal) {
    if (!node) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return validate(node->left, minVal, node->val) &&
           validate(node->right, node->val, maxVal);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,
        },
        explanation: `## Range Validation
Each node must be within (min, max). Left children tighten max, right children tighten min.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "kth-smallest-bst",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        pattern: "Trees",
        tags: ["tree", "bst", "dfs"],
        description: "Given the root of a BST and integer k, return the kth smallest value.",
        examples: [
            { input: "root = [3,1,4,null,2], k = 1", output: "1" },
        ],
        constraints: ["1 <= k <= n <= 10^4"],
        solutions: {
            python: `def kth_smallest(root, k):
    """Inorder traversal gives sorted order."""
    stack = []
    current = root
    count = 0
    
    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        
        current = current.right
    
    return -1

print("Inorder traversal to get kth element")`,
            cpp: `int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> stk;
    TreeNode* curr = root;
    int count = 0;
    
    while (!stk.empty() || curr) {
        while (curr) {
            stk.push(curr);
            curr = curr->left;
        }
        curr = stk.top(); stk.pop();
        count++;
        if (count == k) return curr->val;
        curr = curr->right;
    }
    return -1;
}`,
        },
        explanation: `## Inorder Traversal
BST inorder gives sorted order. Count until we reach k.`,
        timeComplexity: "O(h + k)",
        spaceComplexity: "O(h)",
    },
    {
        id: "binary-tree-max-path-sum",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        pattern: "Trees",
        tags: ["tree", "dfs", "dp"],
        description: "Find the maximum path sum in a binary tree. Path can start and end at any node.",
        examples: [
            { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "Path: 15 -> 20 -> 7" },
        ],
        constraints: ["1 <= Number of nodes <= 3 * 10^4"],
        solutions: {
            python: `def max_path_sum(root):
    """Track global max while returning max single path."""
    max_sum = [float('-inf')]
    
    def dfs(node):
        if not node:
            return 0
        
        # Max sum from left/right subtrees (ignore negative)
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        
        # Path through current node
        max_sum[0] = max(max_sum[0], left + node.val + right)
        
        # Return max single path (can only go one direction)
        return node.val + max(left, right)
    
    dfs(root)
    return max_sum[0]

print("Max path can go through any node")`,
            cpp: `int maxSum;

int dfs(TreeNode* node) {
    if (!node) return 0;
    
    int left = max(0, dfs(node->left));
    int right = max(0, dfs(node->right));
    
    maxSum = max(maxSum, left + node->val + right);
    return node->val + max(left, right);
}

int maxPathSum(TreeNode* root) {
    maxSum = INT_MIN;
    dfs(root);
    return maxSum;
}`,
        },
        explanation: `## Two Return Values Concept
1. Global max: can go both directions through a node
2. Return value: can only go one direction (to extend path upward)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
    },
    {
        id: "serialize-deserialize",
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        pattern: "Trees",
        tags: ["tree", "dfs", "bfs", "design"],
        description: "Design an algorithm to serialize and deserialize a binary tree.",
        examples: [
            { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
        ],
        constraints: ["0 <= Number of nodes <= 10^4"],
        solutions: {
            python: `class Codec:
    def serialize(self, root):
        """Preorder with 'N' for null."""
        result = []
        
        def dfs(node):
            if not node:
                result.append('N')
                return
            result.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        
        dfs(root)
        return ','.join(result)
    
    def deserialize(self, data):
        """Rebuild from preorder."""
        values = data.split(',')
        self.idx = 0
        
        def dfs():
            if values[self.idx] == 'N':
                self.idx += 1
                return None
            
            node = TreeNode(int(values[self.idx]))
            self.idx += 1
            node.left = dfs()
            node.right = dfs()
            return node
        
        return dfs()

# Test
codec = Codec()
print("Preorder serialization with null markers")`,
            cpp: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "N";
        return to_string(root->val) + "," + 
               serialize(root->left) + "," + 
               serialize(root->right);
    }
    
    TreeNode* deserialize(string data) {
        queue<string> nodes;
        stringstream ss(data);
        string item;
        while (getline(ss, item, ',')) nodes.push(item);
        return build(nodes);
    }
    
private:
    TreeNode* build(queue<string>& nodes) {
        string val = nodes.front(); nodes.pop();
        if (val == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = build(nodes);
        node->right = build(nodes);
        return node;
    }
};`,
        },
        explanation: `## Preorder with Null Markers
Serialize: preorder traversal, mark nulls. Deserialize: rebuild in same order.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
];
