#!/usr/bin/env node
import * as program from 'commander';
import { isFileExist } from './promisify';
import {
  version,
  opt,
  ResourceResolver,
  ImageResolver,
  JavascriptResolver,
  TypescriptResolver
} from './index';

program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .option('-w, --watch', 'watch mode')
  .parse(process.argv);

//main
(async function main() {
  console.time('⛽️ build:time:|>');
  console.log(`🚀 🚀 wxpack: ${version} 开始构建 `);

  //检查当前是不是小程序根目录
  const isWxProject = await isFileExist('app.json');
  if (!isWxProject) {
    console.log(`
    😞  当前目录:|>${process.cwd()}
    😞  不是小程序的根目录（没有包含app.json）
    🙂  请检查当前的文件路径
    `);
    return;
  }

  opt.output = program.output || 'build';
  opt.watchMode = program.watch || false;
  opt.verbose = program.verbose || false;

  console.log(`
  输出目录: ${opt.output}
  watch模式: ${opt.watchMode}
  verbose模式: ${opt.verbose}
  `);

  //解析资源文件
  new ResourceResolver();

  //解析js
  new JavascriptResolver();

  //解析ts
  new TypescriptResolver();

  //解析image
  new ImageResolver();

  //如果不是watchmode记录下编译时间
  if (!opt.watchMode) {
    process.on('exit', () => {
      console.log('\n');
      console.timeEnd('⛽️ build:time:|>');
      console.log('\n');
    });
  }
})();
