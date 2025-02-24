import path from 'path';

const jisonRule = {
  test: /\.jison$/,
  use: {
    loader: path.resolve(__dirname, './jisonLoader'),
    options: {
      'token-stack': true,
    },
  },
};

const jsRule = {
  test: /\.js$/,
  include: [
    path.resolve(__dirname, './src'),
    path.resolve(__dirname, './node_modules/dagre-d3-renderer/lib'),
  ],
  use: {
    loader: 'babel-loader',
  },
};

const scssRule = {
  // load scss to string
  test: /\.scss$/,
  use: [{ loader: 'css-to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
};

export const jsConfig = () => {
  return {
    amd: false, // https://github.com/lodash/lodash/issues/3052
    mode: 'development',
    target: 'web',
    entry: {
      mermaid: './src/mermaid.js',
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jison'],
      fallback: {
        fs: false, // jison generated code requires 'fs'
        path: require.resolve('path-browserify'),
      },
    },
    output: {
      path: path.join(__dirname, './dist/'),
      filename: '[name].js',
      library: {
        name: 'mermaid',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'typeof self !== "undefined" ? self : this',
    },
    module: {
      rules: [jsRule, scssRule, jisonRule],
    },
    devtool: 'source-map',
  };
};
