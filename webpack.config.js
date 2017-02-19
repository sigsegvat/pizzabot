var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'target/slackbot/index.js'
  },
  externals: [nodeExternals()]
}