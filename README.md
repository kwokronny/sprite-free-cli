# 雪碧图

[作者博客](https://kwokronny.top/) | [简易教程](https://kwokronny.top/202011/sprites-cli-develop/)

## 工具介绍

雪碧图生成的命令行工具，对范围目录下的特定文件夹批量合成雪碧图，仅需提供 js 处理样式规则生成，无需学习新的模板语言，高度自由化的 JS 逻辑控制生成；默认提供 4 种预处理语言的生成模板。

## 快速上手

- ### 安装与使用

  ```bash
  npm install @hiyoz/sprite-cli -g

  sprites-cli [options]

  通过命令对指定目录下的所有结尾 -sprite 结束的雪碧图文件夹，生成雪碧图到指定的生成目录，并生成雪碧图的对应样式文件。支持不同文件夹自定义CSS样式

  Options:
  	-s, --scope [value]  [必填]设定范围目录，范围目录下所有结尾 -sprite 结束的雪碧图文件夹
  	-r, --rule [value]   生成sheet规则版本: css less scss stylus，默认使用css若 优先使用雪碧图文件夹下有 template.js 生成规则脚本
  	-d, --dist [value]   生成目录[相对于范围目录路径]，默认 "./"
  ```
