# 滑动懒加载
1. 优点
减轻服务器压力
更快的把页面加载出来

2. 实现过程
文档图片用属性储存原url
进行比较 获取元素的尺寸大小和窗口的偏移大小 

A. 获取屏幕可视窗口大小、浏览器窗口顶部与文档顶部的距离、元素的尺寸
B. 获取元素距离文档顶部和左边的距离
C. 判断元素进入或者即将进入可视区域
D. 改变元素src属性

# http缓存

## 强缓存
当请求的资源命中强缓存 返回码为200 size列会显示from cache
## 过期时间 Expires
缓存过期时间 一般和last-modified和cache-control结合
在过期时间内从缓存中获取

请求过程
浏览器请求 -> 是否存在缓存 -> 是否过期 -> 服务器决策 -> 呈现(加载)页面

# Promise

ES6原生提供的 用于传递异步操作

## 状态

1. pending 初始状态(也可以过程中)
2. fulfilled 操作完成
3. rejected 操作失败
4. 状态的改变 是通过resolve或者reject改变 只能调用一次

## 回调
1. then
```js
    let Mypromise = new Promise((resolve,reject)=>{
      .....
    })
    // 两种写法均可
    Mypromise.then(res=>{
      //处理成功的回调
    }).catch(err=>{
      //处理失败的回调
    })
    Mypromise.then(res=>{
      //处理成功的回调
    },err=>{
      //处理失败的回调
    })
```

2. all
用于多个Promise实例 包装成一个新的Promise实例
当全部实例都变成fulfilled的状态或者其中一个rejected 会传递给新实例的回调函数

3. race
用于多个Promise实例 包装成一个新的Promise实例
有一个实例改变状态 就将改变状态的结构给到新的Promise实例中