title: Hexo 部署到 Github Pages 文件夹大小写问题
date: 2015-10-17 18:54:09
categories:
- Hexo
tags:
- Hexo
- Git
---

# 问题

使用 Hexo 部署博客到 Github Pages 时经常会遇到文件夹大小写问题导致的 404问题。

譬如 Hexo 生成了一个 `Hackerrank in JS` Category文件夹，但是我后来把它改成了  `Hackerrank In JS`，即 in 的首字母大写了。Hexo会生成正确，但部署到 Github 上却老是不正确。

# 原因

git 默认忽略文件名大小写，所以即使文件夹大小写变更，git 也检测不到。

<!--more-->

# 解决办法

+ 进入到博客项目中 `.deploy_git`文件夹，修改 `.git` 下的 `config` 文件，将 `ignorecase=true` 改为 `ignorecase=false` 

```
cd .deploy_git
vim .git/config
```
![config](http://7xnlp7.com1.z0.glb.clouddn.com/hexo-deploy.png-small)

+ 删除博客项目中 `.deploy_git` 文件夹下的所有文件，并 push 到 Github 上, 这一步是清空你的 github.io 项目中所有文件。

```
git rm -rf *
git commit -m 'clean all file'
git push
```

+ 使用 Hexo 再次生成及部署

```
cd ..
hexo clean
hexo deploy -generate
```




