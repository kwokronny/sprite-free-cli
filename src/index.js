#! /usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-s, --scope [value]", "设定范围目录，范围目录下所有结尾 -sprite 结束的雪碧图文件夹")
  .option("-r, --rule [value]", "生成sheet规则版本: css less scss stylus，默认使用css若 优先使用雪碧图文件夹下有 template.js 生成规则脚本")
  .option("-d, --dist [value]", "生成目录[相对于范围目录路径]，默认 \"./\"")
  .description("通过命令对指定目录下的所有结尾 -sprite 结束的雪碧图文件夹，生成雪碧图到指定的生成目录，并生成雪碧图的对应样式文件。支持不同文件夹自定义CSS样式")
  .parse(process.argv);

require("./sprites")(program);
