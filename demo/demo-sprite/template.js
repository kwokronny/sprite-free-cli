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
