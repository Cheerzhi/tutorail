function randomInt() {
  return Math.floor(Math.random() * 31 + 2)
}

function randomArr(arr, num = randomInt()) {
  if (arr.length === 5) {
    return console.log(arr)
  }
  if (!arr.includes(num)) {
    arr.push(num)
    randomArr(arr)
  }
}
let arr = new Array()
randomArr(arr)

// css link标签和@import的区别

// link标签是html上下文顺序进行加载文件 可以在页面载入时同时加载
// @import是运行在css文件内部 在页面加载完成之后再进行import的对应文件的加载
// IE5不兼容import关键字

//双飞翼布局 圣杯布局
// 相同
// 都是解决左右固定中间自适应的布局
// 低于最小宽度都会布局错乱
// 不同
// 有无外置容器