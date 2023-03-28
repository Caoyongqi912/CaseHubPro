import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSetting from './defaultSetting';

const path = require('path');
const webpack = require('webpack');

const { APP_ENV = 'dev' } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    dark: true,
  },
  dva: {
    hmr: true,
  },
  fastRefresh: {},
  proxy: proxy[APP_ENV as keyof typeof proxy],
  layout: {
    ...defaultSetting,
  },
  locale: false,
  routes,
  manifest: {
    basePath: '/',
  },
  mfsu: {},
  chainWebpack(config) {
    // 使用 ProvidePlugin 插件将 'window.monaco' 注入到全局作用域中
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        'window.monaco': 'monaco-editor/esm/vs/editor/editor.api.js',
      },
    ]);

    // 设置 Monaco Editor 别名，以便使用 ESM 版本支持 Tree Shaking
    config.resolve.alias.set(
      'monaco-editor$',
      path.resolve(
        __dirname,
        'node_modules/monaco-editor/esm/vs/editor/editor.main.js',
      ),
    );
  },
});
