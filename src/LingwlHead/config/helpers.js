/**
 * @author: @dima1034
 */
var path = require('path');

/*you can use this as a flag for running only certain parts of your code according to what npm script is executed*/
const TARGET = process.env.npm_lifecycle_event || '';

// Helper functions
var ROOT = path.resolve(__dirname, '..');
var WWWROOT = path.resolve(__dirname, '../wwwroot');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
  return TARGET.includes(flag);
}

function isWebpackDevServer() {
  debugger;
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);
var wwwroot = path.join.bind(path, WWWROOT);

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.wwwroot = wwwroot;
exports.root = root;