# 雪碧图


## 工具介绍
雪碧图生成的命令行工具，仅需提供js处理样式规则生成，无需学习新的模板语言，高度自由化的JS逻辑控制生成；默认提供4种预处理语言的生成模板。

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

- ### 基础使用示例
	`demo`目录下`galaxy-sprite`存储了等待合成的雪碧图原料。希望生成stylus的CSS规则文件
	```bash
		sprites-cli -s demo -r stylus
	```
	通过命令即可在demo目录下生成galaxy-sprite.styl与galaxy-sprite.png文件。

- ### 自定义样式生成
	部分雪碧图在使用时希望支持一定的交互效果，如：某图标在移过去时变换成另一个图标时；即可通过自定义样式生成的方案，在自定义生成符合需求的CSS规则。
	
	仅需将在 相应的雪碧图文件夹内 如：`galaxy-sprite`文件夹下，创建`template.js`文件，代码如下：
	> 当雪碧图文件夹下存在`template.js`时，该雪碧图文件夹的CSS规则生成仅以此为唯一的生成规则
	```javascript
	module.exports = function (spritesheet) {
		let spritesCSS = ``;
		if (Array.isArray(spritesheet.sprites)) {
			spritesCSS = spritesheet.sprites
				.map((sprite) => {
					return `
					&-${sprite.name} {
						background-position: ${sprite.x}px ${sprite.y}px;
						width: ${sprite.width}px;
						height: ${sprite.height}px;
					}
					`;
				})
				.join("");
		}
		let mainCSS = `
			@spriteName: "${spritesheet.name}"
			.@{spriteName}{
				display:inline-block;
				vertical-align: middle;
				background-image: url(${spritesheet.image});
				background-size: ${spritesheet.width}px ${spritesheet.height}px;
				${spritesCSS}
			}
		`;
		return [mainCSS, "styl"];//返回样式规则文本和文件后缀名
	};
	```
	这样就可以通过自由的改变逻辑完成多变的需求啦。

## License
MIT