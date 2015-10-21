title: 'Leetcode In JS #70 Climb Stairs'
date: 2015-10-17 15:38:29
categories:
- Leetcode In JS
tags:
- Leetcode
- JavaScript
- Algorithm
- Dynamic Programming
---

# Problem Description

> You are climbing a stair case. It takes n steps to reach to the top.

> Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

<!--more-->

# Analysis

![分析](http://7xnlp7.com1.z0.glb.clouddn.com/70-notes.png-small)

# Solution

## Solution 1 Recusive Version

```
/**
 * @param {number} n
 * @return {number}
 */
/**
 * Dynamic Programming - Memorized Recursive Version
 */
var W = [0, 1, 2];

var climbStairs = function(n) {
    if (W[n] === undefined){
        W[n] = climbStairs(n - 2) + climbStairs(n - 1);
    }

    return W[n];
};
```

递归方式运行时间:

![递归方式运行时间](http://7xnlp7.com1.z0.glb.clouddn.com/70-runtime1.png-small)

## Solution 2 Loop Version

```
/**
 * @param {number} n
 * @return {number}
 */
/**
 * Dynamic Programming - Iteration Version
 */
var climbStairs = function(n) {
    var W = [0, 1, 2];
    for (var i = 3; i <= n; i++) {
        W[i] = W[i - 2] + W[i - 1];
    }

    return W[n];
};
```

循环方式运行时间:

![循环方式运行时间](http://7xnlp7.com1.z0.glb.clouddn.com/70-runtime2.png-small)

## 性能分析

理论上循环是比递归快的，因为同样是线性时间复杂度，递归调用需要频繁的进行栈操作，而循环不需要。
