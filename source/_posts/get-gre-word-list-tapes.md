title: 使用 nodejs 批量下载红宝书音频
date: 2014-07-27 19:05
categories:
- Node.js
tags:
- Node.js
---

# 前言

今天早上因为~~罪恶感~~奋发图强，早早起来开始背单词。背之前想先听一下WordList 3的单词音频，所以用手机对着红宝书WordList上的二维码扫了一下，进入网页听录音（新东方真是与时俱进呀！都用上二维码了！！）。

听了一会，突发奇想，何不把所有WordList的音频都下下来装在手机里呢，这样随时都可以听！于是开始笨拙的把微信里的网页链接分享到电脑上，然后用浏览器一个一个的下载，下了几个感觉不对劲。。。太麻烦了，这种重复性的工作干嘛要自己做！！交给计算机就好了嘛！

so，我写了个`nodejs`程序批量的下载，不到1分钟，42个list的录音就都进入了我的硬盘。 ; ）

首先是github [项目地址](https://github.com/dukewan/getGreWordListTapes)，取名为 `getGreWordListTapes` ~

下面我说说制作过程
<!--more-->

# 找规律

红宝书里的二维码所包含的信息就是音频的链接，链接的形式如下：

```
http://download.dogwood.com.cn/online/grechjx/WordList01.mp3
```

很容易看出，末尾就是WordList01.mp3，代表第1个单词表的音频，随便改了下那个数字，改成02，03，..，42等，都能访问对应的单词表的音频。

所以批量下载就是从01循环到42，就能下载所有的单词表的音频啦。

# 处理流程

![处理流程图](/images/2014/get-gre-word-list-tapes-flow.png)

# 几点注意

其实本身也很简单，按照流程图很快就能做出来，但是有一些需要注意的地方。譬如：

1. nodejs 的  `http`  模块的 `get` 方法可以帮助我们请求目标url，并获取返回的数据，但是数据不是一次性返回的，而是一段( `chunk`）一段的来的，因此我们需要在 `get` 方法的回调函数里对 http response的 `data` 事件进行监听，并对获取到的数据段进行文件的 append 操作。

2. nodejs 可以并发的下载，而且各个文件的下载并不是按顺序来的。但是文件的写入是按顺序并且是同步的写入的，不然就会出现文件错乱。因此我采用了 `fs` 模块的 `appendFileSync` 方法。

3. 需要对音频文件是否存在进行判断，不然就会出现第二次运行下载程序的时候，会在之前下载过的文件后继续append。 这是个逻辑问题，哈~



# 处理代码

```
var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk');

var urlTemplate = 'http://download.dogwood.com.cn/online/grechjx/WordList%s.mp3',
    start = 1,
    end = 42,
    fileBasePath = './download/',
    fileTemplate = 'WordList%s.mp3';

console.log(chalk.red('G') + chalk.green('R') + chalk.yellow('E')
            + chalk.blue(' 词汇精选音频')
            + chalk.cyan('  开始下载！！！'));

console.log(chalk.green('Tips: 每个list的音频大概是13M，所以下载速度会因网速而异，'
            + '请耐心等待哦~ 下载完成的list都在download文件夹中。') )

for (var i = start; i <= end; i++) {
    download(i);
}

function download (i) {
    var str = (i < 10 ? '0' : '') + i,
    url = util.format(urlTemplate, str),
    filename = util.format(fileTemplate, str),
    filePath = path.normalize(fileBasePath + filename);

    fs.exists(filePath, function (exists) {
        if(exists) {
            console.log(chalk.yellow('% ') + chalk.white(filename) + chalk.yellow(' 已存在，不再下载'));
        } else {
            http.get(url, function (res) {
                // console.log(chalk.magenta('$ ') + chalk.white('开始下载 ') + chalk.white(filename));
                res.on('data', function (chunk) {
                    fs.appendFileSync(filePath, chunk);
                });

                res.on('end', function () {
                    console.log(chalk.green('✓ ') + chalk.yellow('下载 ') + chalk.blue(filename) + chalk.green(' 成功!'));
                });
            })
            .on('error', function (err) {
                console.log(chalk.red('X ') + chalk.yellow('下载 ') + chalk.blue(filename) + chalk.red(' 失败!'));
                console.log(err);
            });
        };
    });
}
```

# 运行效果

使用 [chalk](https://www.npmjs.org/package/chalk) 模块添加了下图中的终端高亮效果，嘿嘿~

![下载效果](/images/2014/download.png)

最后，把所有的音频添加到itunes中做成专辑，加上封面~

![itunes](/images/2014/itunes.png)
