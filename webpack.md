## basic config
webpack-cli和webpack-dev-server是有版本兼容性的问题;cli需要降版本;
或者不改版本将webpack serve --config webpack.config.js --open
webpack.config.js

```js
module.exports = {
  entry:'./src/index.js', //打包入口
  output:{
    filename:'./bundle.js', //出口
  },
  mode:'development',
  devServer:{
    publicPath:'/dist' //浏览器模拟环境对应文件夹
  }
}
```

### commonJS ES6-Module  AMD?/CMD? 
1. commonJS 是nodeJS开发出来的一种规范
- 模块 module 

    模块自身的作用域、变量和函数只有自身才能访问;通过script的标签引入页面会污染全局环境;

- 导出 module.exports/exports
- 引入 require
  
  引入模块会有一个属性记录是否被加载过;多次引入的只会加载第一次;后面的不会执行代码

2. ES6-Module
- 除了模块自身的作用域、变量和函数只有自身才能访问;自动采用了严格模式;
- 导出 export:命名导出/默认导出 (export/export default)
- 命名导出可以通过关键字as对变量重命名;

3. commonJS与ES6 Module的区别

- commonJS是动态的;ES6 Module是仅仅是模块依赖关系建立在代码编译的时候;
- 循环依赖的结果 commonJS模块被引入执行时有可能的未完成就取出导出值;ES6-modules则会使用执行完成后的导出值
## loader


## plugin


## devtools && sourcemap


## hot-server


## splitchunk && pages


