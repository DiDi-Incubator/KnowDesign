// 为基础组件注入额外添加的样式
const path = require('path');
const fs = require('fs');

const additinoalStyleDir = path.resolve(__dirname, '../components/style/cover-style');
const additionFiles = fs.readdirSync(additinoalStyleDir);

additionFiles.forEach((lessName) => {
  const dirName = lessName.split('.')[0];
  const targetLessFilePath = `components/basic/${dirName}/style/index.less`;
  const targetLessFile = path.resolve(__dirname, `../${targetLessFilePath}`);

  if (fs.existsSync(targetLessFile)) {
    fs.readFile(targetLessFile, (err, data) => {
      if (err) {
        console.log(`失败: 读取 ${targetLessFilePath} 文件出错, ${err.message}`);
        return false;
      }
      const content = data.toString();
      const injectString = `@import "../../../style/cover-style/${lessName}";`;
      if (content.includes(injectString)) {
        console.log(`跳过: ${targetLessFilePath} 已注入`)
      } else {
        fs.appendFile(targetLessFile, `@import "../../../style/cover-style/${lessName}";`, (err) => {
          if (err) {
            console.log(`失败：${targetLessFilePath} 注入失败, ${err.message}`)
          } else {
            console.log(`成功: ${targetLessFilePath} 注入成功`)
          }
        })
      }
    })
  }
})
