import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSetting from './defaultSetting';
import { join } from 'path';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    dark: true, //暗色主题
    // compact: true //紧凑主题
  },
  fastRefresh: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  layout: {
    ...defaultSetting,
  },
  locale: false,
  routes,
  manifest: {
    basePath: '/',
  },
  mfsu: {},
});
