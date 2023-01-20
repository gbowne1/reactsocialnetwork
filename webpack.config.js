var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
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
};
