module.exports = function (spritesheet) {
  let spritesCSS = ``;
  if (Array.isArray(spritesheet.sprites)) {
    spritesCSS = spritesheet.sprites
      .map((sprite) => {
        return `
        &-${sprite.name} {
          background-position: -${sprite.x}px -${sprite.y}px;
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
  return [mainCSS, "less"];
};
