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

# HTML5 有哪些新特性？

1. 语义化标签
header section article nav aside 
2. video audio标签
3. canvas
4. 地理定位
5. svg标签
6. local storage(本地存储)

# Doctype作⽤? 严格模式与混杂模式如何区分？它们有何意义?

1. doctype的作用
告知浏览器以什么标准解析html文档

2. 严格模式与混杂模式如何区分？

    标准模式(严格模式)的排版和JS运作模式都是以该浏览器支持的最高标准运行。
在兼容模式（混杂模式或怪异模式）中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

# cookies,sessionStorage,localStorage 的区别？
1. 共同点

    都属于浏览器端的存储方式

2. 不同点

|名称|存储大小|存储时间|备注|作用域|
|:----:|:----:|:----:|:----:|:----:|
|cookies|4k|可自行设定时间|同源的请求会携带上cookies的信息|所有同源窗口都共享|
|sessionStorage|5m|标签页存在的时间||仅当前窗口共享|
|localStorage|5m|持久数据||所有同源窗口都共享|

# 浏览器是如何渲染页面的？
1. 解析文档构建DOM树
2. 构建渲染树
3. 布局与绘制渲染树
## 脚本和样式文件对页面的渲染影响
1. 文档解析中遇到脚本或者css文件,则暂停文档的解析,开始下载样式文件和脚本文件
2. 待下载完成后继续解析文档,样式文件在下载就会立刻执行
3. 若dom树先于样式渲染完成,在样式文件执行完成后引起一次重绘
4. 脚本文件中的执行是会阻碍dom树的渲染的
5. defer和async属性能够调整脚本下载的顺序

- defer 是新的线程进行下载
- async 是脚本异步下载

## 回流和重绘
1. 回流

    回流指的是元素的尺寸、位置、显示隐藏改变导致渲染树的重新绘制
2. 重绘

    重绘指的是元素中某些属性的更改影响外观、风格而不影响布局的绘制

3. 区别

    回流必定引起重绘,而重绘不一定引起回流
    
## 如何提高首屏加载速度

#  CSS 的权重和优先级
1. 权重
- !important
- 内联样式
- id选择器
- 类选择器、伪类、属性选择器
- 标签 伪元素
2. 优先级
- 先从高等级进行比较，高等级相同时，再比较低等级的，以此类推；
- 完全相同的话，就采用 后者优先原则（也就是样式覆盖）；
- css属性后面加 !important 时，无条件绝对优先（比内联样式还要优先）；

# 实现两栏布局
```html
<div class="container">
  <div class="left">左侧内容</div>
  <div class="right">右侧内容</div>
</div>
```
1. float+margin
```css
* {
  margin:0;
  padding:0;
}

.container {
  overflow:hidden;
}

.left {
  float:left;
  width:200px;
  height:200px;
}

.right {
  margin-left:200px;
  height:200px;
}
```

2. position(绝对定位)
```css
* {
  margin:0;
  padding:0;
}

.container {
  overflow:hidden;
  position:relative;
}

.left {
  position:absolute;
  left:0;
  top:0;
  width:200px;
  height:200px;
}

.right {
  margin-left:200px;
  height:200px;
}
```

3. inline-block&& calc
```css
* {
  margin:0;
  padding:0;
}

.container {
  overflow:hidden;
  width:100%
}

.left {
  display:inline-block;
  width:200px;
  height:200px;
}

.right {
  display:inline-block;
  width:calc(100% - 200px);
  height:200px;
}
```

4. flex布局

```css
* {
  margin:0;
  padding:0;
}

.container {
  display:flex;
  width:100%;
}

.left {
  height:200px;
  flex:0 0 200px;
}

.right {
  flex:1;
  height:200px;
}
```


# 三栏布局

```html
<div class="container">
  <div class="left">左侧内容</div>
  <div class="main">中侧内容</div>
  <div class="right">右侧内容</div>
</div>
```

1. 两边浮动 + 中间margin

```css
* {
  margin:0;
  padding:0;
}

.container {
  overflow:hidden;
  width:100%;
}

.left,.right {
  width:200px;
  float:left;
}

.main {
  margin: 0 200px;
}
```

2. 绝对定位

```css
* {
  margin:0;
  padding:0;
}

.container {
  overflow:hidden;
  position:positive;
  width:100%;
}

.left,.right {
  width:200px;
  height:300px;
  position:absolute;
}

.left{
  left:0px;
}

.right{
  right:0;
}

.main {
  margin: 0 200px;
  height:300px;
  left:200px;
  right:300px;
}
```

# 清除浮动

1. 添加一个额外标签
```html
  <div class="father">
    <div class="float"></div>
    <div class="clear"></div>
  </div>
```
```css
  .float{
    float:left;
  }
  .clear{
    clear:both;
  }

```

2. 父级元素添加overflow:hidden属性

```css
  .float{
    float:left;
  }
  .father{
    overflow:hidden;
  }
```

3. 双伪元素清除浮动
```css
  .float:after,.float:before {
    content:"";
  }

  .float:after {
    clear:both;
  }
```

# BFC
块式格式化上下文

内部的盒子在垂直方向依序放置
盒子间距由margin确定

- float的值不为none。
- overflow的值不为visible。
- display的值为table-cell,  table-caption, inline-block中的任何一个。
- position的值不为relative和static。
- 根元素或者其他包含它的元素