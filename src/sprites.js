const fs = require("fs");
const path = require("path");
const spritesmith = require("spritesmith");

module.exports = function (options) {
  if (!["stylus", "scss", "less"].includes(options.rule)) {
    options.rule = "css";
  }
  let spritesheet = require("./template/" + options.rule);
  let watchDir = path.resolve(options.scope);
  let spriteImage = fs.readdirSync(watchDir);

  spriteImage.forEach((name) => {
    // 如icon
    if (/-sprite$/.test(name)) {
      // 选出后缀以 -sprite 结束的文件夹处理雪碧图
      let dirname = path.resolve(watchDir, name);
      let assets = fs.readdirSync(dirname);
      let assetsEnum = {};
      assets = assets
        .map((name) => {
          if (/(.jpg|.png|.jpeg)$/.test(name)) {
            // 选出jpg|png两种图片类型文件
            let _path = path.resolve(dirname, name);
            assetsEnum[_path] = name.replace(/(.jpg|.png|.jpeg)$/, "");
            return _path;
          }
          return null;
        })
        .filter((name) => name != null); // 过滤map带回的无用文件名
      // 执行雪碧图拼合
      spritesmith.run({ src: assets, algorithm: "binary-tree", padding: 10 }, function handleResult(err, res) {
        if (err) {
          throw err;
        }
        // 如该文件夹下有 template.handlebars 文件则使用文件夹下的
        let template = path.resolve(dirname + "/template.js");
        if (fs.existsSync(template)) {
          spritesheet = require(template);
        }

        let outputDir = path.resolve(watchDir, options.dist || "./");
        let spriteFileName = name + ".png";
        let sheetFileName = name;
        let sprites = Object.keys(res.coordinates).map((_path) => {
          let _sprite = res.coordinates[_path];
          return {
            name: assetsEnum[_path],
            ..._sprite,
          };
        });

        let [sheet, ext] = spritesheet({
          sprites,
          ...res.properties,
          image: `./${spriteFileName}`,
          name: name.replace(/-sprite$/, ""),
        });
        fs.writeFileSync(`${outputDir}/${spriteFileName}`, res.image);
        fs.writeFileSync(`${outputDir}/${sheetFileName}.${ext}`, sheet);
        console.log(`输出图片：${outputDir}/${spriteFileName}`);
        console.log(`输出样式：${outputDir}/${sheetFileName}.${ext}`);
      });
    }
  });
};