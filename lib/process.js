'use strict';

const lazyProcess = (htmlContent, loadingImg) => {
  return htmlContent.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2, p3) {
    // might be duplicate
    if(/data-src/gi.test(str)) return str;
    if(/src="data:image(.*?)/gi.test(str)) return str;
    if(/no-lazy/gi.test(str)) return str;
    const result = str.replace(p2, `${loadingImg || '/images/loading.gif'}" data-src="` + p2).replace(p1, ' class="lazy"' + p1);
    return result;
  });
}

module.exports.processPost = function (data) {
  const loadingImg = this.config.lazyload.loadingImg;
  data.content = lazyProcess.call(this, data.content, loadingImg);
  return data;
};

module.exports.processSite = function (htmlContent) {
  const loadingImg = this.config.lazyload.loadingImg;
  return lazyProcess.call(this, htmlContent, loadingImg);
};