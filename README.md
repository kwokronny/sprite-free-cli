# 雪碧图

[作者博客](https://kwokronny.top/) | [简易教程](https://kwokronny.top/202011/sprites-cli-develop/)

[![](https://img.shields.io/npm/v/sprite-free-cli)](https://www.npmjs.com/package/sprite-free-cli) 

## 工具介绍

雪碧图生成的命令行工具，对范围目录下的特定文件夹批量合成雪碧图，仅需提供 js 处理样式规则生成，无需学习新的模板语言，高度自由化的 JS 逻辑控制生成；默认提供 4 种预处理语言的生成模板。

## 快速上手

- ### 全局安装
  ```bash
  npm install sprite-free-cli -g
  ```

- ### 使用
  ```bash
  sprite-free [options]

  通过命令对指定目录范围内的所有以 -sprite 结尾的雪碧图文件夹，生成 雪碧图和样式 到生成目录，并生成雪碧图的对应样式文件。支持不同文件夹自定义生成规则

  Options:
    -s, --scope [dir]  [必填]目录范围，目录范围内所有结尾 -sprite 结束的雪碧图文件夹
    -r, --rule [css|less|scss|stylus]   生成样式规则版本: css less scss stylus，默认 css。雪碧图文件夹内有特殊生成规则脚本 template.js 优先使用特殊生成规则
    -d, --dist [dir]   生成目录，默认 "./"；目录范围scope 的相对路径
  ```

- ### 基础使用示例
	`demo`目录下`demo-sprite`存储了等待合成的雪碧图原料。希望生成stylus的CSS规则文件
	
  ```bash
  sprites-cli -s demo -r stylus
	```
	
  通过命令即可在demo目录下生成 demo-sprite.styl 与 demo-sprite.png文件。

- ### 自定义样式生成示例
  
	部分雪碧图在使用时希望支持一定的交互效果，如：某图标在移过去时变换成另一个图标时；即可通过自定义样式生成的方案，再自定义生成符合需求的CSS规则。
	
	仅需将在 相应的雪碧图文件夹内 如：`[name]-sprite`文件夹下，创建`template.js`文件，代码如下：
	> 当雪碧图文件夹下存在`template.js`时，该雪碧图文件夹的CSS规则生成仅以此为唯一的生成规则

  ```javascript
    module.exports = function(spritesheet) {
      let spritesCSS = ``;
      if (Array.isArray(spritesheet.sprites)) {
        spritesCSS = spritesheet.sprites
          .map((sprite) => {
            let name = "";
            if (/^van-/.test(sprite.name)) {
              name = `.${sprite.name}`;
            } else {
              name = `.{$spriteName}-${sprite.name}`;
            }
            if (/^tab-([\w]+)_a$/.test(sprite.name)) {
              name = ".van-tabbar-item--active " + name.replace("_a", "");
            } else if (/_a$/.test(sprite.name)) {
              name = name.replace("_a", ".active");
            }
            return `
              ${name} {
                ${sprite.name.indexOf("van-") > -1 ? "@extend .{$spriteName}" : ""}
                background-position: ptr(-${sprite.x}) ptr(-${sprite.y});
                width: ptr(${sprite.width});
                height: ptr(${sprite.height});
              }
            `;
          })
          .join("");
      }
      let mainCSS = `
          $spriteName= "${spritesheet.name}"
          .{$spriteName}{
              position: relative;
              display: inline-block;
              font-style: normal;
              vertical-align: middle;
              background-image: url("${spritesheet.image}");
              background-size: ptr(${spritesheet.width}) ptr(${spritesheet.height});
          }
          ${spritesCSS}
      `;
      return [mainCSS, "styl"]; //返回样式规则文本和文件后缀名
    };
  ```
  根据上面的自定义脚本将会导出如下样式。
  ```styl

  $spriteName = 'demo';

  .{$spriteName} {
    position: relative;
    display: inline-block;
    font-style: normal;
    vertical-align: middle;
    background-image: url('./demo-sprite.png');
    background-size: ptr(285) ptr(230);
  }

  .{$spriteName}-cart {
    background-position: ptr(0) ptr(-140);
    width: ptr(46);
    height: ptr(40);
  }

  ...

  .{$spriteName}-tab-cart {
    background-position: ptr(-112) ptr(-140);
    width: ptr(46);
    height: ptr(38);
  }

  .van-tabbar-item--active .{$spriteName}-tab-cart {
    background-position: ptr(-56) ptr(-140);
    width: ptr(46);
    height: ptr(38);
  }

  ...

  .van-checkbox__icon {
    @extend .{$spriteName};
    background-position: ptr(-248) ptr(-98);
    width: ptr(32);
    height: ptr(32);
  }

  .van-checkbox__icon.van-checkbox__icon--checked {
    @extend .{$spriteName};
    background-position: ptr(-248) ptr(-140);
    width: ptr(32);
    height: ptr(32);
  }
  ```
	这样就可以通过自由的改变逻辑完成多变的需求啦。