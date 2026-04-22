#include <bits/stdc++.h>
using namespace std;

/**
 * COMPREHENSIVE ARRAY DSA REFERENCE
 * This file contains implementations of all major array algorithms and patterns.
 */

// ─── 1. UTILITY FUNCTIONS ────────────────────────────────────────────────────

void printVector(const vector<int>& v) {
    for (int x : v) cout << x << " ";
    cout << endl;
}

// ─── 2. SEARCHING ALGORITHMS ─────────────────────────────────────────────────

// Linear Search - O(n)
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Binary Search - O(log n) - Requires Sorted Array
int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// ─── 3. SORTING ALGORITHMS ───────────────────────────────────────────────────

// Bubble Sort - O(n²)
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

// ─── 4. ARRAY PATTERNS ───────────────────────────────────────────────────────

// Kadane's Algorithm - Maximum Subarray Sum - O(n)
int maxSubarraySum(const vector<int>& arr) {
    int maxSum = arr[0], currentSum = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        currentSum = max(arr[i], currentSum + arr[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}

// Prefix Sum - O(n) build, O(1) query
vector<int> buildPrefixSum(const vector<int>& arr) {
    int n = arr.size();
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + arr[i];
    return prefix;
}

// Two Pointers - Find pair with target sum (Sorted Array) - O(n)
pair<int, int> twoSumSorted(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {-1, -1};
}

// Sliding Window - Max sum of k consecutive elements - O(n)
int maxSumK(const vector<int>& arr, int k) {
    if (arr.size() < k) return -1;
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}

// Dutch National Flag - Sort 0s, 1s, 2s - O(n)
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else swap(nums[mid], nums[high--]);
    }
}

// ─── 5. ADVANCED TOPICS ───────────────────────────────────────────────────────

// Rotate Matrix 90° Clockwise - O(n²)
void rotateMatrix(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);
    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}

// Trapping Rain Water - O(n) time, O(1) space
int trapRainWater(const vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, totalWater = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else totalWater += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else totalWater += rightMax - height[right];
            right--;
        }
    }
    return totalWater;
}

// ─── MAIN FOR TESTING ────────────────────────────────────────────────────────

int main() {
    vector<int> arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
    cout << "Max Subarray Sum (Kadane's): " << maxSubarraySum(arr) << endl;

    vector<int> colors = { 2, 0, 1, 2, 1, 0 };
    sortColors(colors);
    cout << "Sorted Colors: "; printVector(colors);

    vector<int> heights = { 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1 };
    cout << "Trapped Rain Water: " << trapRainWater(heights) << endl;

    return 0;
}
