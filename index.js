'use strict';
const path = require('path');
const fs = require('hexo-fs');

if (!hexo.config.lazyload || !hexo.config.lazyload.enable) return;

// copy lazyload.js to public dir
fs.copyFile(path.resolve(__dirname, "lib/lazyload.js"), path.resolve(hexo.public_dir, "js/lazyload/lazyload.js"));
// copy default loading.gif to pnlic dir
if (!hexo.config.lazyload.loadingImg) {
  fs.copyFile(path.resolve(__dirname, "loading.gif"), path.resolve(hexo.public_dir, "images/loading.gif"));
}

if (hexo.config.lazyload.onlypost) {
  hexo.extend.filter.register('after_post_render', require('./lib/process').processPost);
} else {
  hexo.extend.filter.register('after_render:html', require('./lib/process').processSite);
}
hexo.extend.filter.register('after_render:html', require('./lib/addscripts').addScript);