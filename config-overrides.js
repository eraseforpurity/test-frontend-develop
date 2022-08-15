const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  const customConfig = rewireReactHotLoader(config, env);
  customConfig.resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  };

  return customConfig;
};
