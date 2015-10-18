title: 'Leetcode #198 House Robber'
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

动态规划问题。

设对于 n 个房子，能抢到的最大金钱数为 OPT(n)，每栋房子 i 的价值为 Vi。

## 递归公式

对于一栋房子来说，只有两个选择，抢或者不抢。

1. 抢： OPT(n) = Vn + OPT(n - 2)
2. 不抢： OPT(n) = OPT(n - 1)

也就是，如果抢了 n, 那么最多只能抢 n 前面的第二家；如果没抢 n，那么可以抢 n 前面的那一家。

## 初始化

1. n = 0，钱数为 0
2. n = 1，钱数为第一家的钱数
3. n = 2，钱数为第一家和第二家中钱数最大者

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
