var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');

var app = express();
var compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3013, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3013');
});
