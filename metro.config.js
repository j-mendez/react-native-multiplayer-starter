/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx', 'wasm'],
    blacklistRE: blacklist([
      './dist/index.js',
      './dist/index.js.LICENSE',
      /src\/build\/.*/,
    ]),
  },
};
