var path = require('path');
var fs = require('fs');
const replaceLib = require('@ant-design/tools/lib/replaceLib');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ModuleResolveWebpackPlugin = require("../scripts/build/ModuleResolveWebpackPlugin");

const isDev = process.env.NODE_ENV === 'development';
const themeConfig = require('./themeConfig');

function alertBabelConfig(rules) {
  rules.forEach(rule => {
    if (rule.loader && rule.loader === 'babel-loader') {
      if (rule.options.plugins.indexOf(replaceLib) === -1) {
        rule.options.plugins.push(replaceLib);
      }
      rule.options.plugins = rule.options.plugins.filter(
        plugin => !plugin.indexOf || plugin.indexOf('babel-plugin-add-module-exports') === -1,
      );
      // Add babel-plugin-add-react-displayname
      rule.options.plugins.push(require.resolve('babel-plugin-add-react-displayname'));
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  port: 8088,
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  // root: '/dantd/',
  // filePathMapper(filePath) {
  //   if (filePath === '/index.html') {
  //     return ['/index.html', '/index-cn.html'];
  //   }
  //   if (filePath.endsWith('/index.html')) {
  //     return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
  //   }
  //   if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
  //     return [filePath, filePath.replace(/\.html$/, '-cn.html')];
  //   }
  //   return filePath;
  // },
  themeConfig,
  source: {
    components: './components',
    docs: './docs',
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    // const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');
    config.resolve.alias = {
      // 'antd': path.join(process.cwd(), 'components'),
      // 'dcloud-design': path.join(process.cwd(), 'components'),
      'knowdesign': path.join(process.cwd(), 'components'),
      '@didi/d1-packages': path.join(process.cwd(), 'components'),
      // 'antd/lib': path.join(process.cwd(), 'components'),
      // 'antd/es': path.join(process.cwd(), 'components'),
      // Change antd from `index.js` to `site/antd.js` to remove deps of root style
      // antd: path.join(process.cwd(), 'site', 'antd'),
      site: path.join(process.cwd(), 'site'),
      //在插件中单独处理bisheng的router别名
      // 'react-router': 'react-router/umd/ReactRouter',
      'react/jsx-runtime': require.resolve('jsx-runtime'),
    };
    config.resolve.plugins = [
      new ModuleResolveWebpackPlugin({
        'bisheng': {
          'react-router': 'react-router/umd/ReactRouter'
        }
      })
    ];
    
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    if (isDev) {
      config.devtool = 'source-map';

      // Resolve use react hook fail when yarn link or npm link
      // https://github.com/webpack/webpack/issues/8607#issuecomment-453068938
      config.resolve.alias = { ...config.resolve.alias, react: require.resolve('react') };
    } else if (process.env.ESBUILD) {
      // use esbuild
      config.plugins.push(new ESBuildPlugin());
      config.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
        }),
        new CssMinimizerPlugin(),
      ];
    }
    delete config.module.noParse;
    // alertBabelConfig(config.module.rules);

    config.plugins.push(
      new WriteFilePlugin({
        test: /\.ico$/
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(process.cwd(), '/site/static'), 
            to: path.join(process.cwd(), '_site'),
          }
        ],
        options: {

        }
      }),
    );

    return config;
  },
  // htmlTemplateExtraData: {
  //   isDev,
  // },
};
