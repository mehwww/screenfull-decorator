module.exports = (isES) => {
  const plugins = [
    require.resolve('babel-plugin-transform-es3-member-expression-literals'),
    require.resolve('babel-plugin-transform-es3-property-literals'),
    require.resolve('babel-plugin-transform-object-assign'),
  ];
  if (!isES) {
    plugins.push(require.resolve('babel-plugin-add-module-exports'));
  }
  plugins.push([require.resolve('babel-plugin-transform-runtime')]);

  return {
    presets: [['env', { modules: isES ? false : 'commonjs' }], 'react', 'stage-0'],
    plugins,
  };
};
