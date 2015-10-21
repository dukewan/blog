title: "Leetcode In JS #121 Best Time To Buy And Sell Stock"
date: 2015-10-21 10:30:33
categories:
- Leetcode In JS
tags:
- Leetcode
- JavaScript
- Algorithm
- Dynamic Programming
---

# Problem Description

> Say you have an array for which the ith element is the price of a given stock on day i.

> If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

<!--more-->

# Analysis

## Idea 1

When I saw this problem, my first thought was to go through all of the prices and find the min and max in O(n) time and compute the maximum profit with (max - min).

However, this idea is wrong. Let's see the following graph.

![sotck prices](http://7xnlp7.com1.z0.glb.clouddn.com/121-stock%20prices.png-small)

The min and max of this sotck price graph is min2 and max1. But (max1 - min2) is not what we want since we can't sell a stock before buy it(max1 is before min2).

## Idea 2

Then I try to solve it using Dynamic Programming.

Let OPT(i, k) denotes the maximum we get at day k if we buy the stock at day i.

Let $P_i$ denotes the price of stock at day i.

Let optTal denotes the maximum we get.

Then we have:

{% raw %}
$
OPT(i, k) = 
\begin{cases}
	OPT(i, k - 1) & \text{not sell at day k} \\ 
	P_k - P_i & \text{sell at day k}
\end{cases}
$
{% endraw %}

and the optimal:

{% raw %}
$
\begin{align}
	optTotal = max\{OPT(i, j)\} \\
	1 \le i \le n \\
	i \le j \le n 
\end{align}
$
{% endraw %}

With this formula, we can calculate the correct answer in $O(n^2)$ time.

However, this solution is not efficient and will exceed the time limit of LeetcodeOJ.

## Idea 3

We can go through all of the prices and update the min. Compute the profit we can get at day i by calculate ($P_i$ - min), update the max if we get a higher profit.

The complexity is O(n).

This solution works great!

# Solution

## Dynamic Programming Version 1(not good)

```JavaScript
/**
 * @param {number[]} prices
 * @return {number}
 * Brute force version with complextity of O(n^2).
 * NOTICE!: Will exceed time limt.
 */
var maxProfit = function(prices) {
    var length = prices.length,
        opt = [],
        optBuyAtI = [];
        optTotal = 0;

    if (length === 0 || length == 1) {
        return 0;
    }

    for (var i = 1; i <= length - 1; i++) {
        opt[i] = [];
        opt[i][i] = Math.max(prices[i] - prices[i - 1], 0);
        optBuyAtI[i] = opt[i][i];
        for (var j = i + 1; j <= length - 1; j++) {
            opt[i][j] = Math.max(opt[i][j - 1], prices[j] - prices[i]);
            optBuyAtI[i] = Math.max(opt[i][j], optBuyAtI[i]);
        }
        optTotal = Math.max(optBuyAtI[i], optTotal);
    }

    return optTotal;
};

```

## Dynamic Programming Version 2 (good)

```JavaScript
/**
 * @param {number[]} prices
 * @return {number}
 * More like greedy. Reserve the partial optimal and replace it when
 * a better result is found.
 * With complextity of O(n)
 */
var maxProfit = function (prices) {
    var length = prices.length,
        min = Infinity,
        res = -Infinity;

    for (var i = 0; i <= length - 1; i++) {
        if (prices[i] < min) {
            min = prices[i];
        } else if (prices[i] > min && prices[i] - min > res) {
            res = prices[i] - min;
        }
    }

    if (isFinite(res)) {
        return res;
    } else {
        return 0;
    }
};
```
