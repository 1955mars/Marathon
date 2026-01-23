/**
 * Extended problem library - Arrays & Hashing problems
 */
import { Problem } from "./problems";

export const arrayProblems: Problem[] = [
    {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        pattern: "Arrays & Hashing",
        tags: ["array", "hash-set"],
        description: "Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "true" },
            { input: "nums = [1,2,3,4]", output: "false" },
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
        solutions: {
            python: `def contains_duplicate(nums):
    """Use a set to track seen numbers."""
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Test
nums = [1, 2, 3, 1]
print(f"Input: {nums}")
print(f"Output: {contains_duplicate(nums)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) return true;
        seen.insert(num);
    }
    return false;
}

int main() {
    vector<int> nums = {1, 2, 3, 1};
    cout << "Output: " << (containsDuplicate(nums) ? "true" : "false") << endl;
    return 0;
}`,
        },
        explanation: `## Approach: Hash Set
Use a set for O(1) lookup. As we iterate, check if we've seen the number before.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        pattern: "Arrays & Hashing",
        tags: ["string", "hash-map", "sorting"],
        description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
        examples: [
            { input: 's = "anagram", t = "nagaram"', output: "true" },
            { input: 's = "rat", t = "car"', output: "false" },
        ],
        constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters"],
        solutions: {
            python: `def is_anagram(s, t):
    """Count character frequencies."""
    if len(s) != len(t):
        return False
    
    from collections import Counter
    return Counter(s) == Counter(t)

# Alternative without Counter:
def is_anagram_manual(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in t:
        count[c] = count.get(c, 0) - 1
        if count[c] < 0:
            return False
    return True

# Test
print(is_anagram("anagram", "nagaram"))`,
            cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    for (char c : t) {
        count[c]--;
        if (count[c] < 0) return false;
    }
    return true;
}

int main() {
    cout << (isAnagram("anagram", "nagaram") ? "true" : "false") << endl;
    return 0;
}`,
        },
        explanation: `## Approach: Character Count
Count frequency of each character in both strings. They're anagrams if counts match.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        pattern: "Arrays & Hashing",
        tags: ["string", "hash-map", "sorting"],
        description: "Given an array of strings, group the anagrams together. You can return the answer in any order.",
        examples: [
            { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
        ],
        constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100"],
        solutions: {
            python: `from collections import defaultdict

def group_anagrams(strs):
    """Group by sorted string as key."""
    groups = defaultdict(list)
    
    for s in strs:
        key = tuple(sorted(s))  # or ''.join(sorted(s))
        groups[key].append(s)
    
    return list(groups.values())

# Test
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(group_anagrams(strs))`,
            cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    
    vector<vector<string>> result;
    for (auto& pair : groups) {
        result.push_back(pair.second);
    }
    return result;
}

int main() {
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    auto result = groupAnagrams(strs);
    for (auto& group : result) {
        cout << "[";
        for (auto& s : group) cout << s << ",";
        cout << "] ";
    }
    return 0;
}`,
        },
        explanation: `## Approach: Hash Map with Sorted Key
Anagrams have the same sorted form. Use sorted string as hash key to group them.`,
        timeComplexity: "O(n * k log k)",
        spaceComplexity: "O(n * k)",
    },
    {
        id: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        pattern: "Arrays & Hashing",
        tags: ["array", "hash-map", "heap", "bucket-sort"],
        description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.",
        examples: [
            { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
            { input: "nums = [1], k = 1", output: "[1]" },
        ],
        constraints: ["1 <= nums.length <= 10^5", "k is in range [1, number of unique elements]"],
        solutions: {
            python: `from collections import Counter

def top_k_frequent(nums, k):
    """Bucket sort approach - O(n) time."""
    count = Counter(nums)
    
    # Buckets: index = frequency, value = list of numbers
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # Collect top k from highest frequency
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result

# Test
nums = [1, 1, 1, 2, 2, 3]
print(f"Top 2: {top_k_frequent(nums, 2)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;
    
    // Min heap of (freq, num)
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    
    for (auto& [num, freq] : count) {
        pq.push({freq, num});
        if (pq.size() > k) pq.pop();
    }
    
    vector<int> result;
    while (!pq.empty()) {
        result.push_back(pq.top().second);
        pq.pop();
    }
    return result;
}

int main() {
    vector<int> nums = {1,1,1,2,2,3};
    auto result = topKFrequent(nums, 2);
    for (int n : result) cout << n << " ";
    return 0;
}`,
        },
        explanation: `## Approach: Bucket Sort
1. Count frequencies
2. Create buckets where index = frequency
3. Iterate from highest frequency bucket to collect k elements`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "product-except-self",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        pattern: "Arrays & Hashing",
        tags: ["array", "prefix-sum"],
        description: "Given an integer array `nums`, return an array where each element is the product of all elements except itself. Must run in O(n) without division.",
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ],
        constraints: ["2 <= nums.length <= 10^5", "The product of any prefix/suffix fits in 32-bit integer"],
        solutions: {
            python: `def product_except_self(nums):
    """Two passes: prefix products, then suffix products."""
    n = len(nums)
    result = [1] * n
    
    # Left pass: result[i] = product of all elements to the left
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    
    # Right pass: multiply by product of all elements to the right
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    
    return result

# Test
nums = [1, 2, 3, 4]
print(f"Input: {nums}")
print(f"Output: {product_except_self(nums)}")`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Left pass
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    
    // Right pass
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    auto result = productExceptSelf(nums);
    for (int n : result) cout << n << " ";
    return 0;
}`,
        },
        explanation: `## Approach: Prefix and Suffix Products
For each position, we need: (product of all left) × (product of all right)
1. First pass: compute prefix products
2. Second pass: multiply by suffix products`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        pattern: "Arrays & Hashing",
        tags: ["array", "hash-set", "union-find"],
        description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.",
        examples: [
            { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "Sequence is [1, 2, 3, 4]" },
        ],
        constraints: ["0 <= nums.length <= 10^5"],
        solutions: {
            python: `def longest_consecutive(nums):
    """Only start counting from sequence beginnings."""
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Only start if this is the beginning of a sequence
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            longest = max(longest, length)
    
    return longest

# Test
nums = [100, 4, 200, 1, 3, 2]
print(f"Longest: {longest_consecutive(nums)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longest = 0;
    
    for (int num : numSet) {
        if (!numSet.count(num - 1)) {  // Start of sequence
            int current = num;
            int length = 1;
            
            while (numSet.count(current + 1)) {
                current++;
                length++;
            }
            longest = max(longest, length);
        }
    }
    return longest;
}

int main() {
    vector<int> nums = {100, 4, 200, 1, 3, 2};
    cout << "Longest: " << longestConsecutive(nums) << endl;
    return 0;
}`,
        },
        explanation: `## Key Insight
Only start counting from the **beginning** of a sequence (when num-1 doesn't exist).
This ensures each number is visited at most twice → O(n).`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
];
