
// Shuffle the Array

var shuffle = function (nums, n) {
    let nums2 = nums.slice(n)
    for (let i = 0; i < n; i++) {
        nums[(2 * i) + 1] = nums2[i]
    }
    return nums
};

// console.log(
//     shuffle([2, 5, 1, 3, 4, 7], 3)
// );


function numIdenticalPairs(nums) {

    nums = nums.sort((a, b) => a - b)
    let total_pair = 0

    let n = 0
    let prev = null
    let curr = null
    for (let i = 0; i <= nums.length; i++) {
        curr = nums[i]

        if (curr === prev) n++
        else {
            if (n) {
                total_pair += (n * (n + 1)) / 2
            }
            prev = curr
            n = 0
        }

    }

    return total_pair

}


//  Kids With the Greatest Number of Candies

var kidsWithCandies = function (candies, extraCandies) {

    let max_candy = 0
    for (let i = 0; i < candies.length; i++) {
        max_candy = Math.max(candies[i], max_candy)
    }
    for (let i = 0; i < candies.length; i++) {
        candies[i] = (candies[i] + extraCandies) >= max_candy
    }

    return candies

};

// console.log(
//     kidsWithCandies([2, 3, 5, 1, 3], 3)
// );


// 1672. Richest Customer Wealth

var maximumWealth = function (accounts) {

    let max_wealth = -Infinity

    for (let i = 0; i < accounts.length; i++) {
        const banks = accounts[i];
        let wealth = 0
        for (let j = 0; j < banks.length; j++) {
            wealth += banks[j];
        }

        max_wealth = Math.max(max_wealth, wealth)
    }

    return max_wealth
};


console.log(
    maximumWealth([[1, 5], [7, 3], [3, 5]])
);