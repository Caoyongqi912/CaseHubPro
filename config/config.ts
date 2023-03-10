import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSetting from './defaultSetting';

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
});
