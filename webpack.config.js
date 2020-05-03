const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, './public', "dist"),
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig-client.json"
        }
      },

      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    historyApiFallback: true,
    publicPath: '/dist/',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
