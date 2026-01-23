/**
 * Binary Search problems
 */
import { Problem } from "./problems";

export const binarySearchProblems: Problem[] = [
    {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Easy",
        pattern: "Binary Search",
        tags: ["array", "binary-search"],
        description: "Given a sorted array of integers nums and a target, return the index of target or -1 if not found.",
        examples: [
            { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
            { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
        ],
        constraints: ["1 <= nums.length <= 10^4", "nums is sorted in ascending order"],
        solutions: {
            python: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test
nums = [-1, 0, 3, 5, 9, 12]
print(f"Index of 9: {binary_search(nums, 9)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> nums = {-1, 0, 3, 5, 9, 12};
    cout << "Index of 9: " << binarySearch(nums, 9) << endl;
    return 0;
}`,
        },
        explanation: `## Classic Binary Search
Repeatedly halve the search space by comparing with middle element.`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "search-2d-matrix",
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        pattern: "Binary Search",
        tags: ["array", "binary-search", "matrix"],
        description: "Search for a target in an m x n matrix where each row is sorted and the first element of each row is greater than the last element of the previous row.",
        examples: [
            { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
        ],
        constraints: ["m == matrix.length", "n == matrix[i].length"],
        solutions: {
            python: `def search_matrix(matrix, target):
    """Treat 2D matrix as 1D sorted array."""
    if not matrix or not matrix[0]:
        return False
    
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    
    while left <= right:
        mid = (left + right) // 2
        row, col = mid // n, mid % n
        val = matrix[row][col]
        
        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return False

# Test
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
print(search_matrix(matrix, 3))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    if (matrix.empty()) return false;
    int m = matrix.size(), n = matrix[0].size();
    int left = 0, right = m * n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}

int main() {
    vector<vector<int>> matrix = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << (searchMatrix(matrix, 3) ? "true" : "false") << endl;
    return 0;
}`,
        },
        explanation: `## Treat as 1D Array
Map 1D index to 2D: row = idx / cols, col = idx % cols`,
        timeComplexity: "O(log(m*n))",
        spaceComplexity: "O(1)",
    },
    {
        id: "find-minimum-rotated-sorted",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        pattern: "Binary Search",
        tags: ["array", "binary-search"],
        description: "Given a rotated sorted array of unique elements, find the minimum element.",
        examples: [
            { input: "nums = [3,4,5,1,2]", output: "1" },
            { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
        ],
        constraints: ["n == nums.length", "1 <= n <= 5000"],
        solutions: {
            python: `def find_min(nums):
    """Binary search: go towards the unsorted half."""
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[right]:
            # Min is in right half
            left = mid + 1
        else:
            # Min is in left half (including mid)
            right = mid
    
    return nums[left]

# Test
nums = [3, 4, 5, 1, 2]
print(f"Min: {find_min(nums)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right])
            left = mid + 1;
        else
            right = mid;
    }
    return nums[left];
}

int main() {
    vector<int> nums = {3, 4, 5, 1, 2};
    cout << "Min: " << findMin(nums) << endl;
    return 0;
}`,
        },
        explanation: `## Key Insight
If mid > right, the minimum is in the right half (after rotation point).
Otherwise, it's in the left half including mid.`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "search-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        pattern: "Binary Search",
        tags: ["array", "binary-search"],
        description: "Search for target in a rotated sorted array. Return index or -1 if not found.",
        examples: [
            { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
        ],
        constraints: ["1 <= nums.length <= 5000", "All values are unique"],
        solutions: {
            python: `def search(nums, target):
    """Binary search with sorted half detection."""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# Test
nums = [4, 5, 6, 7, 0, 1, 2]
print(f"Index of 0: {search(nums, 0)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << "Index of 0: " << search(nums, 0) << endl;
    return 0;
}`,
        },
        explanation: `## Strategy
1. Find which half is sorted
2. Check if target is in the sorted half
3. Search the appropriate half`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "koko-eating-bananas",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        pattern: "Binary Search",
        tags: ["array", "binary-search"],
        description: "Koko can eat at speed k bananas/hour. Given piles and h hours, find minimum k to finish all bananas.",
        examples: [
            { input: "piles = [3,6,7,11], h = 8", output: "4" },
        ],
        constraints: ["1 <= piles.length <= 10^4", "1 <= h <= 10^9"],
        solutions: {
            python: `import math

def min_eating_speed(piles, h):
    """Binary search on the answer (speed k)."""
    def can_finish(k):
        hours = sum(math.ceil(pile / k) for pile in piles)
        return hours <= h
    
    left, right = 1, max(piles)
    
    while left < right:
        mid = (left + right) // 2
        if can_finish(mid):
            right = mid  # try smaller speed
        else:
            left = mid + 1
    
    return left

# Test
piles = [3, 6, 7, 11]
print(f"Min speed: {min_eating_speed(piles, 8)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int minEatingSpeed(vector<int>& piles, int h) {
    auto canFinish = [&](int k) {
        long hours = 0;
        for (int pile : piles)
            hours += (pile + k - 1) / k;  // ceil division
        return hours <= h;
    };
    
    int left = 1, right = *max_element(piles.begin(), piles.end());
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

int main() {
    vector<int> piles = {3, 6, 7, 11};
    cout << "Min speed: " << minEatingSpeed(piles, 8) << endl;
    return 0;
}`,
        },
        explanation: `## Binary Search on Answer
Search for minimum valid speed k in range [1, max(piles)].`,
        timeComplexity: "O(n log m)",
        spaceComplexity: "O(1)",
    },
];
