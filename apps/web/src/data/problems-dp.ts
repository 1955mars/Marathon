/**
 * Dynamic Programming problems
 */
import { Problem } from "./problems";

export const dpProblems: Problem[] = [
    {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        pattern: "Dynamic Programming",
        tags: ["dp", "fibonacci"],
        description: "You can climb 1 or 2 steps at a time. How many distinct ways to climb n stairs?",
        examples: [
            { input: "n = 2", output: "2", explanation: "1+1 or 2" },
            { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" },
        ],
        constraints: ["1 <= n <= 45"],
        solutions: {
            python: `def climb_stairs(n):
    """Fibonacci pattern: dp[i] = dp[i-1] + dp[i-2]"""
    if n <= 2:
        return n
    
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    
    return curr

# Test
for i in range(1, 6):
    print(f"n={i}: {climb_stairs(i)} ways")`,
            cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev = 1, curr = 2;
    for (int i = 3; i <= n; i++) {
        int temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    return curr;
}`,
        },
        explanation: `## Fibonacci Pattern
To reach step n, you can come from n-1 or n-2.
So ways(n) = ways(n-1) + ways(n-2).`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "array"],
        description: "Cannot rob adjacent houses. Return maximum amount you can rob.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 and 3: 1 + 3 = 4" },
            { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1, 3, 5: 2 + 9 + 1 = 12" },
        ],
        constraints: ["1 <= nums.length <= 100"],
        solutions: {
            python: `def rob(nums):
    """dp[i] = max(rob this house + dp[i-2], skip and take dp[i-1])"""
    if len(nums) <= 2:
        return max(nums)
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        current = max(nums[i] + prev2, prev1)
        prev2, prev1 = prev1, current
    
    return prev1

# Test
print(rob([2, 7, 9, 3, 1]))  # 12`,
            cpp: `int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    
    int prev2 = nums[0];
    int prev1 = max(nums[0], nums[1]);
    
    for (int i = 2; i < nums.size(); i++) {
        int curr = max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
        },
        explanation: `## Decision at Each House
At house i: rob it (nums[i] + best from i-2) or skip (best from i-1).`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "house-robber-ii",
        title: "House Robber II",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "array"],
        description: "Houses are in a circle (first and last are adjacent). Cannot rob adjacent houses.",
        examples: [
            { input: "nums = [2,3,2]", output: "3", explanation: "Cannot rob house 1 and 3 (adjacent in circle)" },
        ],
        constraints: ["1 <= nums.length <= 100"],
        solutions: {
            python: `def rob(nums):
    """Run House Robber I twice: excluding first or last house."""
    if len(nums) == 1:
        return nums[0]
    
    def rob_linear(houses):
        prev2, prev1 = 0, 0
        for h in houses:
            prev2, prev1 = prev1, max(h + prev2, prev1)
        return prev1
    
    # Either exclude first house or last house
    return max(rob_linear(nums[1:]), rob_linear(nums[:-1]))

print(rob([2, 3, 2]))  # 3`,
            cpp: `int robLinear(vector<int>& nums, int start, int end) {
    int prev2 = 0, prev1 = 0;
    for (int i = start; i < end; i++) {
        int curr = max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    return max(robLinear(nums, 0, nums.size()-1), 
               robLinear(nums, 1, nums.size()));
}`,
        },
        explanation: `## Break the Circle
Run linear house robber twice:
1. Exclude first house (can rob last)
2. Exclude last house (can rob first)
Take maximum.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["string", "dp", "two-pointers"],
        description: "Given a string s, return the longest palindromic substring.",
        examples: [
            { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also valid' },
        ],
        constraints: ["1 <= s.length <= 1000"],
        solutions: {
            python: `def longest_palindrome(s):
    """Expand around center for each position."""
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left+1:right]
    
    result = ""
    for i in range(len(s)):
        # Odd length palindrome
        odd = expand(i, i)
        if len(odd) > len(result):
            result = odd
        
        # Even length palindrome
        even = expand(i, i+1)
        if len(even) > len(result):
            result = even
    
    return result

print(longest_palindrome("babad"))  # "bab" or "aba"`,
            cpp: `string longestPalindrome(string s) {
    int start = 0, maxLen = 1;
    
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };
    
    for (int i = 0; i < s.size(); i++) {
        expand(i, i);      // Odd
        expand(i, i + 1);  // Even
    }
    return s.substr(start, maxLen);
}`,
        },
        explanation: `## Expand Around Center
For each position, expand outward while characters match.
Check both odd (single center) and even (two centers) lengths.`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
    },
    {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "array"],
        description: "Given coins and amount, return fewest coins needed. Return -1 if impossible.",
        examples: [
            { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "5 + 5 + 1 = 11" },
        ],
        constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
        solutions: {
            python: `def coin_change(coins, amount):
    """dp[i] = min coins to make amount i"""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 2, 5], 11))  # 3`,
            cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
        },
        explanation: `## Bottom-Up DP
dp[i] = minimum coins to make amount i.
For each amount, try using each coin.`,
        timeComplexity: "O(amount * coins)",
        spaceComplexity: "O(amount)",
    },
    {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "binary-search"],
        description: "Return the length of the longest strictly increasing subsequence.",
        examples: [
            { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" },
        ],
        constraints: ["1 <= nums.length <= 2500"],
        solutions: {
            python: `def length_of_lis(nums):
    """O(n log n) using binary search."""
    from bisect import bisect_left
    
    tails = []  # tails[i] = smallest tail for LIS of length i+1
    
    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)

# O(n²) DP solution:
def length_of_lis_dp(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4`,
            cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if (it == tails.end())
            tails.push_back(num);
        else
            *it = num;
    }
    return tails.size();
}`,
        },
        explanation: `## Binary Search Optimization
Maintain array of smallest tails for each LIS length.
Use binary search to find position to insert/replace.`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "word-break",
        title: "Word Break",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "string", "trie"],
        description: "Given string s and dictionary, return true if s can be segmented into dictionary words.",
        examples: [
            { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
        ],
        constraints: ["1 <= s.length <= 300"],
        solutions: {
            python: `def word_break(s, wordDict):
    """dp[i] = can we form s[0:i] from dictionary words?"""
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # Empty string
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]

print(word_break("leetcode", ["leet", "code"]))  # True`,
            cpp: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> words(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;
    
    for (int i = 1; i <= s.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && words.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.size()];
}`,
        },
        explanation: `## DP with Word Check
dp[i] = true if s[0:i] can be formed.
Check all possible last words ending at i.`,
        timeComplexity: "O(n² * m)",
        spaceComplexity: "O(n)",
    },
    {
        id: "unique-paths",
        title: "Unique Paths",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "matrix", "math"],
        description: "Robot starts at top-left of m×n grid. Can only move right or down. Count unique paths to bottom-right.",
        examples: [
            { input: "m = 3, n = 7", output: "28" },
        ],
        constraints: ["1 <= m, n <= 100"],
        solutions: {
            python: `def unique_paths(m, n):
    """dp[i][j] = dp[i-1][j] + dp[i][j-1]"""
    # Space optimized: only need previous row
    dp = [1] * n
    
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    
    return dp[n-1]

print(unique_paths(3, 7))  # 28`,
            cpp: `int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}`,
        },
        explanation: `## Simple 2D DP
Paths to (i,j) = paths from above + paths from left.
Space optimized to single row.`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "edit-distance",
        title: "Edit Distance",
        difficulty: "Medium",
        pattern: "Dynamic Programming",
        tags: ["dp", "string"],
        description: "Find minimum operations (insert, delete, replace) to convert word1 to word2.",
        examples: [
            { input: 'word1 = "horse", word2 = "ros"', output: "3" },
        ],
        constraints: ["0 <= word1.length, word2.length <= 500"],
        solutions: {
            python: `def min_distance(word1, word2):
    """Classic 2D DP."""
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # Delete
                    dp[i][j-1],      # Insert
                    dp[i-1][j-1]     # Replace
                )
    
    return dp[m][n]

print(min_distance("horse", "ros"))  # 3`,
            cpp: `int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i-1] == word2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    }
    return dp[m][n];
}`,
        },
        explanation: `## 2D DP
dp[i][j] = min ops to convert word1[0:i] to word2[0:j].
If chars match, no op needed. Otherwise, try all three ops.`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
    },
];
