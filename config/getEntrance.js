const path = require('path');
const fs = require('fs');
const paths = require('./paths');
const entrancePaths = path.resolve(paths.appSrc, 'entrances')
const files = fs.readdirSync(entrancePaths);
let entrances = [];
files.forEach(item => {
  item = path.parse(item);
  // item = { root: '', dir: '', base: 'user.js', ext: '.js', name: 'user' }
  const exts = ['.js', '.jsx', '.ts', '.tsx'];
  if (exts.includes(item.ext)) { 
    entrances.push(item)
  }
})

module.exports = entrances;