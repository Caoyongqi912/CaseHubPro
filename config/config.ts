import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSetting from './defaultSetting';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    dark: true,
  },
  dva: {
    hmr: true,
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
