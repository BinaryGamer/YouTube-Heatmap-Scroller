const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   devtool: 'source-map',
   mode: "production",
   entry: {
      navigator: path.resolve(__dirname, "..", "src", "navigator.ts"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
};