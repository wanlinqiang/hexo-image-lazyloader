
window.onload=checkImgs;
window.onscroll = throttle(checkImgs);

function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth=window.innerWeight;
  return bound.top <= clientHeight + 100;
}

let index = 0;
function checkImgs() {
  const imgs = document.querySelectorAll('.lazy');
  for (let i = index; i < imgs.length; i++) {
    if (isInSight(imgs[i])) {
      loadImg(imgs[i]);
      index = i;
    }
  }
  // Array.from(imgs).forEach(el => {
  //   if (isInSight(el)) {
  //     loadImg(el);
  //   }
  // })
}

function loadImg(el) {
  if (el.src.includes('loading.gif')) {
    const source = el.dataset.src;
    el.src = source;
  }
}

function throttle(fn, delay = 500) {
  // 上一次执行的时间
  let previous = null;
  return function() {
    // 当前时间
    const now = new Date();
    // 节流方法形参fn方法的执行作用域this
    const _this = this;
    // fn方法的参数
    const args = arguments;
    // 第一次执行，默认设置当前时间就是上次执行的时间
    if (!previous) previous = now;
    // 当现在距离上次执行的时间大于节流限制时间时
    if (delay && now - previous >= delay) {
      // 调用fn，还原fn本该在的作用域
      fn.apply(_this, args);
      // 赋值当前执行时间，方便下次判断
      previous = now;
    }
  }
}
