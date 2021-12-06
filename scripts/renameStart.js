const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

try {
  // 文件夹重命名 components -> src
  const srcPath = path.resolve(__dirname, '../src');
  const componentsPath = path.resolve(__dirname, '../components');
  fs.renameSync(componentsPath, srcPath);

  // 文件重命名 
  // tsconfig.json —> tsconfig.normal.json
  // tsconfig.father.json —> tsconfig.json
  const tsconfig = path.resolve(__dirname, '../tsconfig.json');
  const tsconfigFather = path.resolve(__dirname, '../tsconfig.father.json');
  const tsconfigNormal = path.resolve(__dirname, '../tsconfig.normal.json');
  fs.renameSync(tsconfig, tsconfigNormal);
  fs.renameSync(tsconfigFather, tsconfig);
  console.log('Successfully renamed the directory.');

} catch (err) {
  console.log(err);
}
