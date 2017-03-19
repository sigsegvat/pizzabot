var nodeExternals = require('webpack-node-externals');
var glob = require("glob");

module.exports = {
  entry: {
    'main': './src/index.js',
    'test': glob.sync("./src/**/*.test.*")
  },
  target: 'node',
  resolve: {
        extensions: ["", ".webpack.js", ".ts", ".js"]
    },
    module: {
       loaders: [
           { test: /\.ts$/, loader: "awesome-typescript-loader" }
       ],
     },
  output: {
    filename: 'target/slackbot/[name].js'
  },
  externals: [nodeExternals()]
}
