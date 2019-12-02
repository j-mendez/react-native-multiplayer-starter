const path = require('path');

const mode = process.env.production ? 'production' : 'development';

module.exports = {
  mode,
  devtool: process.env.production ? 'source-map' : 'inline-source-map',
  externals: {
    'react-native': 'react-native',
    'react-native-gesture-handler': 'react-native-gesture-handler',
    'react-native-firebase': 'react-native-firebase',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs',
    chunkFilename: '[id].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.wasm'],
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        include: /src/,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
            plugins: [
              ['@babel/plugin-transform-flow-strip-types'],
              ['@babel/plugin-transform-runtime'],
              ['@babel/plugin-proposal-export-namespace-from'],
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
              [
                'module-resolver',
                {
                  alias: {
                    views: './src/views',
                    logic: './src/logic',
                    components: './src/components',
                    utils: './src/utils',
                    state: './src/state',
                    assembly: './src/assembly',
                    build: './src/build',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
    importAwait: true,
    importAsync: true,
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
};
