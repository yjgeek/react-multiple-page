const path = require('path');
const paths = require('./paths');
const fs = require('fs');
const files = fs.readdirSync(paths.appSrc);
let alias = {};
files.forEach(name => {
  const dirPath = path.join(__dirname, '../src', name);
  const stats = fs.statSync(dirPath);
  if (stats.isDirectory()) {
    alias[name] = dirPath;
  }  
})
module.exports = alias;