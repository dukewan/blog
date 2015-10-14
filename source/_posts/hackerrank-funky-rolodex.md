title: Percolate Coding Challenge - Funky Rolodex
date: 2015-10-14 10:02:48
categories:
- Coding Challenge
- Hackerrank in JS
tags:
- JavaScript
- Hackerrank
- Regular Expression
- JSON
- Node.js
---

## 前言

上周参加了学校的 Career Fair，想锻炼下面试技巧和口语能力，为下学期找暑期实习做点准备。那天整条路都是熙熙攘攘的面试官和学生，Facebook、Amazon、Microsoft、eBay 这些大公司尤其火爆，有的人排了几个小时才面试上。

因为我刚来 USC 两个月，实力不够，而且大公司又有冷冻期（一次没有录上半年内不再面试），所以我也没敢投大公司，挑了几个看起来不错的小公司试试水。一共投了五个，拿到 Percolate 和 Paypal 两家的 Coding Challenge，还有一家 Demand Media 说是非常喜欢我，之后会打电话让我去 onsite interview（为啥现在还没打电话！）。

这道题是 Percolate 的题，名字叫 Funky Rolodex(复杂的关系网) 并没有考算法，而是非常贴近实际需求，处理文本文件，筛选出正确的数据解析并输出成JSON格式。虽然并不难，但是需要注意的小细节不少，譬如输出结果要按照相应地缩进，要对数据按照 Lastname 和 Firstname 排序。我之前没有注意到排序这一点，导致后来重构了一些代码，而且对我来说，排序这里是最难的（后面会解释）。

总体来说这是一道非常好的非算法题，考到了JSON，正则表达式，面向对象编程，字符串比较等等，而且这道题非常考察细心程度。

<!--more-->

## Problem Description

### The Problem

You're tasked with taking entries of personal information in multiple formats
 and normalizing each entry into a standard JSON format. Write your formatted,
valid JSON out to a file with two-space indentation and keys sorted
alphabetically.

### Input

Your program will be fed an input file of n lines. Each line contains "entry"
information, which consists of a first name, last name, phone number, color,
and zip code. The order and format of these lines vary in three separate
ways.

The three different formats are as follows:

+ Lastname, Firstname, (703)-742-0996, Blue, 10013
+ Firstname Lastname, Red, 11237, 703 955 0373
+ Firstname, Lastname, 10013, 646 111 0101, Green

Some lines may be invalid and should not interfere with the processing of
subsequent valid lines. A line should be considered invalid if its phone
number does not contain the proper number of digits.

### Output

The program should write a valid, formatted JSON object. The JSON
representation should be indented with two spaces and the keys should be sorted
in ascending order.

Successfully processed lines should result in a normalized addition to the list
associated with the "entries" key. For lines that were unable to be processed,
a line number i (where 0 ≤ i < n) for each faulty line should be appended to
the list associated with the "errors" key.

The "entries" list should be sorted in ascending alphabetical order by (last
name, first name).

The complete output schema is specified below.

### Sample

For the input

```
Booker T., Washington, 87360, 373 781 7380, yellow
Chandler, Kerri, (623)-668-9293, pink, 123123121
James Murphy, yellow, 83880, 018 154 6474
asdfawefawea
```

we should receive the output
```
{
  "entries": [
    {
      "color": "yellow",
      "firstname": "James",
      "lastname": "Murphy",
      "phonenumber": "018-154-6474",
      "zipcode": "83880"
    },
    {
      "color": "yellow",
      "firstname": "Booker T.",
      "lastname": "Washington",
      "phonenumber": "373-781-7380",
      "zipcode": "87360"
    }
  ],
  "errors": [
    1,
    3
  ]
}
```

## Solution

```
process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
input += chunk;
});
process.stdin.on("end", function () {
    var arr = input.split('\n');

    var role = new ROLE(arr);
    role.processAll();
});

var ROLE = function (arr) {
    this.rawData = arr;

    this.jsonObj = {
        entries : [],
        errors  : []
    };
}

ROLE.prototype.processAll = function () {
    var me = this;

    for (var i = 0 ; i < me.rawData.length ; i++) {
        me.processOneLine(i, me.rawData[i]);
    }

    me.outputJSON();
}

ROLE.prototype.processOneLine = function (index, data) {
    var me = this,
        pArr = data.split(', '),
        nameRe1     = /^.+$/,
        nameRe2     = /^(\w+)\s(.+)$/,
        phoneRe1    = /^\((\d{3})\)-(\d{3})-(\d{4})$/,
        phoneRe2    = /^(\d{3}) (\d{3}) (\d{4})$/,
        zipRe       = /^\d{5}$/,
        colorRe     = /^.+$/;


    if (pArr.length == 4) {
        // type Firstname Lastname, Red, 11237, 703 955 0373
        if (nameRe2.test(pArr[0]) && colorRe.test(pArr[1]) && zipRe.test(pArr[2])
            && phoneRe2.test(pArr[3])) {
            var names = nameRe2.exec(pArr[0]),
                phones = phoneRe2.exec(pArr[3]);
            var obj = [
                pArr[1], // color:
                names[1], // firstname
                names[2], // lastname
                phones[1] + '-' + phones[2] + '-' + phones[3], // phonenumber
                pArr[2] // zipcode
            ]
        }
    } else  if (pArr.length == 5){
        // type Lastname, Firstname, (703)-742-0996, Blue, 10013
        if (nameRe1.test(pArr[0]) && nameRe1.test(pArr[1]) && phoneRe1.test(pArr[2])
            && colorRe.test(pArr[3]) && zipRe.test(pArr[4])
            ) {
            var phones = phoneRe1.exec(pArr[2]);
            var obj = [
                pArr[3], // color
                pArr[1], // firstname
                pArr[0], // lastname
                phones[1] + '-' + phones[2] + '-' + phones[3], // phonenumber
                pArr[4] // zipcode
            ]
        }
        // type Firstname, Lastname, 10013, 646 111 0101, Green
        else if (nameRe1.test(pArr[0]) && nameRe1.test(pArr[1]) && zipRe.test(pArr[2])
            && phoneRe2.test(pArr[3]) && colorRe.test(pArr[4])
            ) {
            var phones = phoneRe2.exec(pArr[3]);
            var obj = [
                pArr[4], // color
                pArr[0], // firstname
                pArr[1], // lastname
                phones[1] + '-' + phones[2] + '-' + phones[3], // phonenumber
                pArr[2] // zipcode
            ]
        }
    }

    if (obj) { // valid
        me.jsonObj.entries.push(obj);
    } else {
        me.jsonObj.errors.push(index);
    }
}

ROLE.prototype.sortEntries = function (a, b) {
    // if (a[2].localeCompare(b[2], 'en-US', {sensitivity: 'variant'}) < 0) {
    //     return -1;
    // } else if (a[2].localeCompare(b[2], 'en-US', {sensitivity: 'variant'}) == 0) {
    //     return a[1].localeCompare(b[1], 'en-US', {sensitivity: 'variant'});
    // } else {
    //     return 1;
    // }
    if (a[2] < b[2]) {
        return -1;
    } else if (a[2] == b[2]) {
        if (a[1] < b[1]) {
            return -1;
        } else if (a[1] == b[1]) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

ROLE.prototype.outputJSON = function () {
    var me = this,
        obj = me.jsonObj,
        oneIndent = '  ',
        twoIndent = oneIndent + oneIndent,
        threeIndent = oneIndent + twoIndent;

    obj.entries.sort(me.sortEntries);

    var str = '{\n';
    str += oneIndent + '"entries": [\n';
    for (var i = 0; i < obj.entries.length; i++) {
        var p = obj.entries[i];

        str += twoIndent + '{\n';
        str += threeIndent + '"color": "' + p[0] + '",\n';
        str += threeIndent + '"firstname": "' + p[1] + '",\n';
        str += threeIndent + '"lastname": "' + p[2] + '",\n';
        str += threeIndent + '"phonenumber": "' + p[3] + '",\n';
        str += threeIndent + '"zipcode": "' + p[4] + '"\n';
        str += twoIndent + '}';

        if (i != obj.entries.length - 1) {
            str += ',';
        }
        str += '\n';
    }
    str += oneIndent + '],\n';
    str += oneIndent + '"errors": [\n';
    for (var i = 0; i < obj.errors.length; i++) {
        str += twoIndent + obj.errors[i];

        if (i != obj.errors.length - 1) {
            str += ',';
        }

        str += '\n';
    }
    str += oneIndent + ']\n';
    str += '}\n';

    process.stdout.write(str);
}
```

## Testcases

### Download Link

[Download](/download/test_cases_funky_rolodex.zip)

### Usage

```
/**
 * 1. create code.js and paste the code above to it
 * 2. run code.js with Node.js in the terminal, set input001.txt as stdin
 * 3. the output will be in stdout
 */
$ node code.js < input001.txt
```
