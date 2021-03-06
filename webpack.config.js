require("dotenv").config({});

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    entry: ["./src/index.ts"],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: "string-replace-loader",
          options: {
            search: /YOUR_API_KEY/g,
            replace: process.env.GOOGLE_MAPS_API_KEY,
          },
        },
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
        {
          test: /\.ts$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      path: `${__dirname}/docs`,
      publicPath: "/",
      filename: "index.js",
      libraryTarget: "window",
    },
    plugins: [].concat(
      env.SKIP_HTML
        ? []
        : [
            new HtmlWebpackPlugin({
              template: "src/index.html",
              inject: false,
            }),
            new HtmlReplaceWebpackPlugin([
              {
                pattern: /YOUR_API_KEY/g,
                replacement: process.env.GOOGLE_MAPS_API_KEY,
              },
            ]),
            new MiniCssExtractPlugin({
              filename: "style.css",
            }),
          ]
    ),
    devServer: {
      liveReload: true,
      host: "0.0.0.0",
      firewall: false,
      hot: false,
    },
  };
};
