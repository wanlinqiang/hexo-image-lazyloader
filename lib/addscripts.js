module.exports.addScript = function (htmlContent) {
  let appendScript = function (content, htmlContent) {
    let lastIndex = htmlContent.lastIndexOf("</head>");
    return (
      htmlContent.substring(0, lastIndex) +
      content +
      htmlContent.substring(lastIndex, htmlContent.length)
    );
  };

  if (/<\/head>/gi.test(htmlContent)) {
    if (htmlContent.indexOf("/js/lazyload/lazyload.js") == -1) {
      htmlContent = appendScript(
        `\n<script src="/js/lazyload/lazyload.js"></script>\n`,
        htmlContent
      );
    }
  }

  return htmlContent;
};
