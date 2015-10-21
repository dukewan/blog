title: 'Leetcode In JS #258 Add Digits'
date: 2015/09/28 16:00
categories:
- Leetcode In JS
tags:
- Leetcode
- JavaScript
- Algorithm
---

## Problem Description

> Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

> For example:

> Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.

<!--more-->

## Solution

```
/**
 * @param {number} num
 * @return {number}
 * @desc trival solution including recursion.
 */
var addDigits = function (num) {
    var quotient = num,
        remainder = 0,
        sum = 0;

    while (quotient >= 10) {
        remainder = quotient % 10;
        sum = sum + remainder;
        quotient = parseInt(quotient / 10);
    }

    sum = sum + quotient;

    if (sum >= 10) {
        return addDigits(sum);
    } else {
        return sum;
    }
};
```
