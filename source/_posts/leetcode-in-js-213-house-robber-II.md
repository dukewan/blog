title: 'Leetcode In JS #213 House Robber II'
date: 2015-10-20 10:32:12
categories:
- Leetcode In JS
tags:
- Leetcode
- JavaScript
- Algorithm
- Dynamic Programming
---

# Problem Description

> After robbing those houses on that street, the thief has found himself a new place for his thievery so that he will not get too much attention. This time, all houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, the security system for these houses remain the same as for those in the previous street.

> Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

<!--more-->

# Analysis

Dynamic Programming problem.

Since the houses are arranged in circle, we should take the first house and the last house specially. Because if we rob the first one, we can't rob the last one since it's the neighbor of the first one.

So there are only two special cases:

1. rob the first one, don't rob the last one
2. rob the last one, don't rob the first one

For case 1, the problem turns into a #198 House Robber problem of 1 ... n-1 houses.

For case 2, the problem turns into a #198 House Robber problem of 2 ... n houses.

Compute the maximum amount of both cases and return the larger one.

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
var rob = function(nums) {
    var length = nums.length;

    if (length === 0) {
        return 0;
    }

    if (length == 1) {
        return nums[0];
    }

    if (length == 2) {
        return Math.max(nums[0], nums[1]);
    }

    var opt1 = [],
    opt2 = [];

    // 1 to n-1
    opt1[0] = nums[0];
    opt1[1] = Math.max(nums[0], nums[1]);
    for (var i = 2; i <= length - 2; i++) {
        opt1[i] = Math.max(nums[i] + opt1[i - 2], opt1[i - 1]);
    }

    // 2 to n
    opt2[1] = nums[1];
    opt2[2] = Math.max(nums[1], nums[2]);
    for (var j = 3; j <= length - 1; j++) {
        opt2[j] = Math.max(nums[j] + opt2[j - 2], opt2[j - 1]);
    }

    return Math.max(opt1[length - 2], opt2[length - 1]);
};


```
