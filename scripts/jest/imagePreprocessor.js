const urlLoader = require('url-loader');

const { svgRegex, svgOptions, imageOptions } = require('../build/getWebpackConfig');

module.exports = {
  process(src, filename) {
    const instance = {
      resourcePath: filename,
    };
    if (svgRegex.test(filename)) {
      instance.query = svgOptions;
    } else {
      instance.query = imageOptions;
    }
    const result = urlLoader.call(instance, src);
    return result;
  },
};
