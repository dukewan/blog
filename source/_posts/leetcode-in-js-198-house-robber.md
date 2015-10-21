title: 'Leetcode In JS #198 House Robber'
date: 2015-10-17 17:37:28
categories:
- Leetcode In JS
tags:
- Leetcode
- JavaScript
- Algorithm
- Dynamic Programming
---

# Problem Description

> You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

> Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight **without alerting the police**.

<!--more-->

# Analysis

Dynamic Programming problem.

## Recursive Formula

For n houses, let OPT(n) denotes the maximum amount we can rob, let Vi denotes the money that the ith house holds.

For the nth house, we have two cases, rob or not rob.

1. rob： OPT(n) = Vn + OPT(n - 2)
2. not rob： OPT(n) = OPT(n - 1)

It means that if we rob the nth house, we can only rob the (n-2)th house next, if we don't rob the nth house, then we can rob the (n-1)th house next.

## Initialization

n means the total number of houses.

1. n = 0，total amount we can rob is 0
2. n = 1，total amount equals to the money the first house holds
3. n = 2，total amount equals to the larger amount of the first and the second house holds

# Solution

```
/**
 * @param {number[]} nums
 * @return {number}
 */

function rob(nums) {
    var length = nums.length;

    if (length === 0) {
        return 0;
    } else if (length == 1) {
        return nums[0];
    }

    var opt = [];
    opt[0] = nums[0],
    opt[1] = Math.max(nums[0], nums[1]);

    for (var i = 2; i < length; i++) {
        opt[i] = Math.max(nums[i] + opt[i - 2], opt[i - 1]);
    }

    return opt[length - 1];
}
```
