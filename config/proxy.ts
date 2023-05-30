/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

interface IProxy {
  target: string;
  changeOrigin: boolean;
  pathRewrite?: {};
}

interface ITarget {
  [targetName: string]: { [propName: string]: IProxy };
}

const proxy: ITarget = {
  dev: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/cbs': {
      target: 'http://127.0.0.1:8999',
      changeOrigin: true,
      pathRewrite: { '^/cbs': '' },
    },
  },
  test: {
    '/api': {
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api': {
      target: 'http://127.0.0.1:5002',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

export default proxy;
