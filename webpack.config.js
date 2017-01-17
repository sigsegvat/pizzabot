 var x =require("./package.json").dependencies;

 for(d in x){
     x[d] = `commonjs ${d}`;
 }

module.exports = {
  entry: './src/main/index.js',
  target: 'node',
  output: {
    path:  'build',
    filename: 'index.js'
  },
  externals : x
}