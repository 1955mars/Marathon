/**
 * Two Pointers & Sliding Window problems
 */
import { Problem } from "./problems";

export const twoPointerProblems: Problem[] = [
    {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        pattern: "Two Pointers",
        tags: ["array", "two-pointers", "sorting"],
        description: "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and nums[i] + nums[j] + nums[k] = 0.",
        examples: [
            { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
        ],
        constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
        solutions: {
            python: `def three_sum(nums):
    """Sort + Two Pointers for each element."""
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        target = -nums[i]
        
        while left < right:
            total = nums[left] + nums[right]
            if total == target:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < target:
                left += 1
            else:
                right -= 1
    
    return result

# Test
nums = [-1, 0, 1, 2, -1, -4]
print(three_sum(nums))`,
            cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    
    for (int i = 0; i < nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        
        int left = i + 1, right = nums.size() - 1;
        int target = -nums[i];
        
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < target) left++;
            else right--;
        }
    }
    return result;
}

int main() {
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    auto result = threeSum(nums);
    for (auto& triplet : result) {
        cout << "[" << triplet[0] << "," << triplet[1] << "," << triplet[2] << "] ";
    }
    return 0;
}`,
        },
        explanation: `## Approach: Sort + Two Pointers
1. Sort the array
2. For each element, use two pointers to find pairs that sum to its negative
3. Skip duplicates to avoid duplicate triplets`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
    },
    {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        pattern: "Two Pointers",
        tags: ["array", "two-pointers", "greedy"],
        description: "Given n non-negative integers representing vertical lines, find two lines that together with the x-axis form a container that holds the most water.",
        examples: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Lines at index 1 and 8 form container with area 7*7=49" },
        ],
        constraints: ["n == height.length", "2 <= n <= 10^5"],
        solutions: {
            python: `def max_area(height):
    """Two pointers from ends, move the shorter one."""
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Move the shorter line (it limits the height)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water

# Test
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
print(f"Max area: {max_area(height)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        int w = right - left;
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, w * h);
        
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}

int main() {
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << "Max area: " << maxArea(height) << endl;
    return 0;
}`,
        },
        explanation: `## Key Insight
Always move the pointer pointing to the shorter line. Why? The shorter line limits the height, and moving the taller one can only decrease the width without possibly increasing height.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        pattern: "Two Pointers",
        tags: ["array", "two-pointers", "dp", "stack"],
        description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
        examples: [
            { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
        ],
        constraints: ["n == height.length", "1 <= n <= 2 * 10^4"],
        solutions: {
            python: `def trap(height):
    """Two pointers with running max from each side."""
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water

# Test
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
print(f"Water trapped: {trap(height)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(vector<int>& height) {
    if (height.empty()) return 0;
    
    int left = 0, right = height.size() - 1;
    int leftMax = height[left], rightMax = height[right];
    int water = 0;
    
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}

int main() {
    vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    cout << "Water trapped: " << trap(height) << endl;
    return 0;
}`,
        },
        explanation: `## Key Insight
Water at position i = min(max_left, max_right) - height[i]
Use two pointers to track max from each side. Process the side with smaller max.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
];

export const slidingWindowProblems: Problem[] = [
    {
        id: "longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        pattern: "Sliding Window",
        tags: ["string", "sliding-window", "hash-map"],
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: 'Answer is "abc"' },
            { input: 's = "bbbbb"', output: "1" },
        ],
        constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
        solutions: {
            python: `def length_of_longest_substring(s):
    """Sliding window with character position tracking."""
    char_index = {}  # char -> last seen index
    max_len = 0
    left = 0
    
    for right, char in enumerate(s):
        # If char seen and within current window, shrink window
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Test
s = "abcabcbb"
print(f"Longest: {length_of_longest_substring(s)}")`,
            cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> charIndex;
    int maxLen = 0, left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        if (charIndex.count(c) && charIndex[c] >= left) {
            left = charIndex[c] + 1;
        }
        charIndex[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl;
    return 0;
}`,
        },
        explanation: `## Sliding Window
Expand right pointer. When duplicate found, shrink from left to exclude the previous occurrence.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, m))",
    },
    {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        pattern: "Sliding Window",
        tags: ["string", "sliding-window", "hash-map"],
        description: "Given strings s and t, return the minimum window in s which contains all characters of t. Return empty string if no such window exists.",
        examples: [
            { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
        ],
        constraints: ["1 <= s.length, t.length <= 10^5"],
        solutions: {
            python: `from collections import Counter

def min_window(s, t):
    """Sliding window with character counts."""
    if not t or not s:
        return ""
    
    t_count = Counter(t)
    required = len(t_count)
    
    left = 0
    formed = 0
    window_counts = {}
    
    result = (float('inf'), None, None)  # (length, left, right)
    
    for right, char in enumerate(s):
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in t_count and window_counts[char] == t_count[char]:
            formed += 1
        
        # Try to shrink window
        while formed == required:
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)
            
            left_char = s[left]
            window_counts[left_char] -= 1
            if left_char in t_count and window_counts[left_char] < t_count[left_char]:
                formed -= 1
            left += 1
    
    return "" if result[0] == float('inf') else s[result[1]:result[2]+1]

# Test
print(min_window("ADOBECODEBANC", "ABC"))`,
            cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

string minWindow(string s, string t) {
    unordered_map<char, int> tCount, windowCount;
    for (char c : t) tCount[c]++;
    
    int required = tCount.size();
    int formed = 0;
    int left = 0, minLen = INT_MAX, minLeft = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        windowCount[c]++;
        
        if (tCount.count(c) && windowCount[c] == tCount[c])
            formed++;
        
        while (formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            char leftChar = s[left];
            windowCount[leftChar]--;
            if (tCount.count(leftChar) && windowCount[leftChar] < tCount[leftChar])
                formed--;
            left++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
}

int main() {
    cout << minWindow("ADOBECODEBANC", "ABC") << endl;
    return 0;
}`,
        },
        explanation: `## Sliding Window with Counter
1. Expand window until all chars of t are included
2. Shrink from left while window is still valid
3. Track minimum window size`,
        timeComplexity: "O(s + t)",
        spaceComplexity: "O(s + t)",
    },
    {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        pattern: "Sliding Window",
        tags: ["array", "sliding-window", "deque", "monotonic-queue"],
        description: "Given an array nums and window size k, return the max value in each sliding window as it moves from left to right.",
        examples: [
            { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
        ],
        constraints: ["1 <= nums.length <= 10^5", "1 <= k <= nums.length"],
        solutions: {
            python: `from collections import deque

def max_sliding_window(nums, k):
    """Monotonic decreasing deque."""
    result = []
    dq = deque()  # stores indices
    
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements (they'll never be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        dq.append(i)
        
        # Add to result once window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Test
nums = [1, 3, -1, -3, 5, 3, 6, 7]
print(max_sliding_window(nums, 3))`,
            cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;  // indices
    
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1)
            dq.pop_front();
        
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();
        
        dq.push_back(i);
        
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    auto result = maxSlidingWindow(nums, 3);
    for (int n : result) cout << n << " ";
    return 0;
}`,
        },
        explanation: `## Monotonic Deque
Maintain a deque where elements are in decreasing order. Front is always the max for current window.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
    },
];
