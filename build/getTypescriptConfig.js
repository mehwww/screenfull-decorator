const fs = require('fs');
const path = require('path');
const defaultOptions = {
  noUnusedLocals: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
};

module.exports = function () {
  let my = {};
  try {
    my = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json')));
  } catch (e) {} // eslint-disable-line no-empty
  return Object.assign({}, defaultOptions, my.compilerOptions);
};
