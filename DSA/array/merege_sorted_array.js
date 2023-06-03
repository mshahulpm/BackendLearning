

/**
 * 
 * @param {Number[]} nums1 
 * @param {Number[]} nums2 
 */
function merge(nums1, m, nums2, n) {


    // check input 
    if (!nums1.length || !nums2.length) {
        return [...nums1, ...nums2]
    }

    nums1 = nums1.slice(0, m)
    nums2 = nums2.slice(0, n)
    let merged_array = []
    let array_1_item = nums1[0]
    let array_2_item = nums2[0]
    let index1 = 0
    let index2 = 0
    // if start element of one array is bigger or equal to end of another it is already sorted 

    if (array_1_item > nums2[nums2.length - 1]) {
        nums1 = [...nums2, ...nums1]
    }
    else if (array_2_item > nums1[nums1.length - 1]) {
        nums1 = [...nums1, ...nums2]
    }

    else {
        while (array_1_item || array_2_item) {


            if (!array_1_item) {
                nums1 = merged_array.concat(nums2.slice(index2))
                break
            }
            if (!array_2_item) {
                nums1 = merged_array.concat(nums1.slice(index1))
                break
            }

            if (array_1_item < array_2_item) {
                merged_array.push(array_1_item)
                index1++
                array_1_item = nums1[index1]
            } else {
                merged_array.push(array_2_item)
                index2++
                array_2_item = nums2[index2]
            }

        }


    }

    if (nums1.length !== m + n) {
        nums1 = merged_array
    }


}



var twoSum = function (nums, target) {

    let hash = {}
    let l = nums.length
    for (var i = 0; i < l; i++) {
        let other = hash[target - nums[i]]
        if (other !== undefined) return [other, i]
        hash[nums[i]] = i
    }

};


var moveZeroes = function (nums) {
    let gap = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            gap++;
        }
        else {
            console.log(i, gap);
            [nums[i - gap], nums[i]] = [nums[i], nums[i - gap]]
            console.log(nums);
        }
    }
    console.log(nums);
};


/**
 * 
 * @param {Number[]} nums 
 * @param {*} k 
 */
var rotate = function (nums, k) {

    k = k % nums.length
    let l = nums.length

    nums.splice(0, 0, ...nums.splice(l - k))

    console.log(nums);

};

var a = [1, 2, 3, 4, 5, 6, 7], k = 3;
rotate(a, k)