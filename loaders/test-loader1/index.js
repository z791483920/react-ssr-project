const loaderUtils = require('loader-utils');

module.exports = function(source, sourceMap, meta) {
  const options = loaderUtils.getOptions(this) || {};
  console.log('12345678');
  this.callback(null, source);
};
