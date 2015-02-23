module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?experimental&optional=selfContained'}
    ]
  }
};
