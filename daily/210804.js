// 去除字符串中所有的空格

function removeSpace(str){
  return console.log(str.split(' ').join(''));
}
let str = ' 123 23 1235  2341234  '
removeSpace(str)

// 在页面上隐藏元素的方法

// display:none
// opacity:0
// visibility:hidden
// width:0;height:0;overflow:hidden
// transform:scale(0)


//去除字符串中最后一个指定的字符

function delLastStr(str,delStr){
  const index = str.lastIndexOf(delStr)
  if(index>-1){
    str = [...str];
    str.splice(index,1)
    return str.join('')
  }
  return str
}