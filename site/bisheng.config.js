var path = require('path');
const replaceLib = require('@ant-design/tools/lib/replaceLib');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    // htmlTemplate: './site/theme/static/template.html',
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
            'dcloud-design': path.join(process.cwd(), 'components'),
            '@didi/d1-packages': path.join(process.cwd(), 'components'),
            'react-router': 'react-router/umd/ReactRouter',
            'react/jsx-runtime': require.resolve('react/jsx-runtime')
                // jquery: path.resolve(NODE_MODULES_PATH, 'jquery'),
        };
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
            config.resolve.alias = {...config.resolve.alias, react: require.resolve('react') };
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

        return config;
    },
    // htmlTemplateExtraData: {
    //   isDev,
    // },
};