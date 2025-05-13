var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: ["./src/App.js"],
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  rules:[
         {
          test: /\.js$/,
          enforce: 'pre',
          use: [
          {
          //needed to chain sourcemaps.  see: https://webpack.js.org/loaders/source-map-loader/
          loader: 'source-map-loader',
           options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          filterSourceMappingUrl: (url, resourcePath) => {
           //  console.log({ url, resourcePath }) example:
           // {
          //  url: 'index.js.map',
          //  resourcePath: '/repos/xlib-wsl/common/temp/node_modules/.pnpm/https-proxy-agent@5.0.0/node_modules/https-proxy-agent/dist/index.js'
           // }

          if (/.*\/node_modules\/.*/.test(resourcePath)) {
          return false
          }
          return true
          }

          }
          }],
          },
         ]
};
