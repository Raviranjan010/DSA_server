#include <iostream>
#include <vector>

using namespace std;

// ==========================================
// ALGORITHM 1: Bubble Sort
// ==========================================
// Time Complexity: O(N^2) worst/average, O(N) best (already sorted)
// Space Complexity: O(1)
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false; // Optimization
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Array is sorted early
    }
}

// ==========================================
// ALGORITHM 2: Selection Sort
// ==========================================
// Time Complexity: O(N^2) always
// Space Complexity: O(1)
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

// ==========================================
// ALGORITHM 3: Insertion Sort
// ==========================================
// Time Complexity: O(N^2) worst/average, O(N) best
// Space Complexity: O(1)
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// ==========================================
// ALGORITHM 4: Merge Sort
// ==========================================
// Time Complexity: O(N log N) always
// Space Complexity: O(N) for temporary arrays

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// ==========================================
// ALGORITHM 5: Quick Sort
// ==========================================
// Time Complexity: O(N log N) average/best, O(N^2) worst (sorted array with bad pivot)
// Space Complexity: O(log N) recursive stack

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Choosing last element as pivot
    int i = low - 1;       // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1; // Partition index
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== SORTING ALGORITHMS DEMO ===" << endl;
    
    vector<int> original = {64, 34, 25, 12, 22, 11, 90};
    
    // Test Bubble Sort
    vector<int> arr1 = original;
    bubbleSort(arr1);
    cout << "Bubble Sorted: ";
    for (int v : arr1) cout << v << " "; cout << endl;

    // Test Selection Sort
    vector<int> arr2 = original;
    selectionSort(arr2);
    cout << "Selection Sorted: ";
    for (int v : arr2) cout << v << " "; cout << endl;
    
    // Test Merge Sort
    vector<int> arr3 = original;
    mergeSort(arr3, 0, arr3.size() - 1);
    cout << "Merge Sorted: ";
    for (int v : arr3) cout << v << " "; cout << endl;

    // Test Quick Sort
    vector<int> arr4 = original;
    quickSort(arr4, 0, arr4.size() - 1);
    cout << "Quick Sorted: ";
    for (int v : arr4) cout << v << " "; cout << endl;

    return 0;
}
