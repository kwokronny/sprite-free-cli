#! /usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-s, --scope [value]", "[必填]目录范围，目录范围内所有结尾 -sprite 结束的雪碧图文件夹")
  .option("-r, --rule [value]", "生成样式规则版本: css less scss stylus，默认 css；雪碧图文件夹内有特殊生成规则脚本 template.js 优先使用特殊生成规则")
  .option("-d, --dist [value]", "生成目录，默认 \"./\"；目录范围scope的相对路径，")
  .description("通过命令对指定目录范围内的所有以 -sprite 结尾的雪碧图文件夹，生成 雪碧图和样式 到生成目录，并生成雪碧图的对应样式文件。支持不同文件夹自定义生成规则\ngithub: https://github.com/hiyoz/sprites-cli")
  .parse(process.argv);

require("./sprites")(program);
