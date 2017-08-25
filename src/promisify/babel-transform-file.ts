import * as babel from 'babel-core';

export default function babelTransformFile(
  file: string,
  opts: Object
): Promise<{ code: string; err: Error }> {
  return new Promise(resolve => {
    console.log(`🙂 正在转换:|> ${file}`);
    babel.transformFile(file, opts, (err, result) => {
      resolve({
        err,
        code: err ? '' : result.code
      });
    });
  });
}
