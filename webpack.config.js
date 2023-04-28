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
};
