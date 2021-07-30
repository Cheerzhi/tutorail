## basic config
webpack-cli和webpack-dev-server是有版本兼容性的问题;cli需要降版本;
或者不改版本将webpack serve --config webpack.config.js --open
webpack.config.js

```js
const path = require('path')
module.exports = {
  entry: {
    index: './index.js',
  }, //SPA的入口 
  // entry: {
  //   pageA: './page/pageA.js',    //多页应用
  //   pageB: "./page/pageB.js",  
  // },
  context: path.join(__dirname, './src'), //默认为根目录
  output: {
    filename: '[hash].js',                //hash 和name
    path: path.join(__dirname, '/dist/assets'),
    //指定资源的请求位置
    publicPath:"./dist/",               //html有关的路径
    // publicPath:"/dist/",             //host形式加载
    // publicPath:"http://cdn.com",     //cdn形式加载     
  },
  mode: 'development',
  devServer: {
    //静态资源服务器的路径
    publicPath: '/dist',
    port:9527,          //端口号
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

### vendor的提取

## loader

### loader概述

1. loader本质上是一个函数;
2. 函数执行后产生转换后的内容、source map、AST;
3. 转换后的内容能够为下一个loader所使用

### loader配置
```js
const path = require('path')
module.exports = {
  entry: {
    index: './index.js',
  }, //SPA的入口 
  // entry: {
  //   pageA: './page/pageA.js',    //多页应用
  //   pageB: "./page/pageB.js",  
  // },
  context: path.join(__dirname, './src'), //默认为根目录
  output: {
    filename: 'bundle.js', //hash 和name
    path: path.join(__dirname, '/dist/assets'),
    //指定资源的请求位置
    publicPath: "./dist/", //html有关的路径
    // publicPath:"/dist/",             //host形式加载
    // publicPath:"http://cdn.com",     //cdn形式加载     
  },
  mode: 'development',
  devServer: {
    //静态资源服务器的路径
    publicPath: '/dist',
    port: 9527, //端口号
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      exclude: /node_modules/, //排除处理的文件
      // include;                     //应该处理的文件
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['env', {
              modules: false
            }]
          ]
        }
      }
    },  {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 2048, //小于2kb转换成base64
          name: '[name].[ext]',
          outputPath: './images/', //输出路径
        }
      }
    }],
  }
}
```


- css
1. css-loader

    编译css样式

2. style-loader

    包装成style标签插入页面

3. sass-loader

    预处理scss文件成css

4. less-loader

    预处理less文件成css
5. postcss-loader

    rem 和vw的预处理转换
- js
1. babel

* babel-loader  
* @babel/core(babel编译器核心模块)
* @babel-preset-env(预置器)
* babel-preset-env

2. typescript(待补充)

- html

- 其他资源

1. file-loader  将其他文件转换为base64
2. url-loader   
* url-loader是封装了file-loader
3. vue-loader   
## plugin(待补充)

1. mini-css-extract-plugin
webpack4 后使用打包css文件成html的link标签

2. HtmlWebpackPlugin
3. SplitChunksPlugin
4. preload-webpack-plugin
## splitchunk && pages

## devtools && sourcemap


## hot-server

