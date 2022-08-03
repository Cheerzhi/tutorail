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
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry:  './src/main.js', //SPA的入口 
  // entry: {
  //   pageA: './page/pageA.js',    //多页应用
  //   pageB: "./page/pageB.js",  
  // },
  // context: path.join(__dirname, './src'), //默认为根目录
  output: {
    filename: 'bundle.js', //hash 和name
    path: path.join(__dirname, '/dist'),
    //指定资源的请求位置
    // publicPath: "./assets/", //html有关的路径
    // publicPath:"http://cdn.com",     //cdn形式加载     
  },
  mode: 'development',
  devServer: {
    //静态资源服务器的路径
    contentBase: './dist',
    // host:"0.0.0.0",  //访问端口号
    // hot:true,
    // open:true        //打开
    // inline:true,     //文件修改后实时刷新
    port: 9527, //端口号
  },
  // devtool:"source-map",    会生成调试完整的.map文件,会减慢打包速度
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
            '@babel/preset-react',
            // ['env', {
            //   modules: false
            // }]
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
          outputPath: './assets/images', //输出路径
        }
      }
    }],
  },
  plugins:[
    new CleanWebpackPlugin(), // 清理文件夹的名称
    new HtmlWebpackPlugin({
      template:"./public/index.html"
    }),
  ]
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

    rem 和vw的预处理转换(常用)
- js
1. babel

* babel-loader  
* @babel/core(babel编译器核心模块)
* @babel-preset-env(预置器)
* babel-preset-env

2. typescript(待补充)


- 其他资源

1. file-loader  将其他文件转换为base64
2. url-loader   
* url-loader是封装了file-loader
* outputPath可设置打包后图片的对应路径
3. vue-loader   
## plugin(待补充)

1. mini-css-extract-plugin
- webpack4 后使用打包css文件成html的link标签

2. HtmlWebpackPlugin
- 以一个模版打包后自动创建对应html文件
- configureWebpack.externals配置不进行编译的库
- pages里配置cdn项对应请求地址 模版中配置编译的css、js标签
- 去掉代码中的引入项即可
  
3. SplitChunksPlugin
```js
configureWebpack:{
  optimization:{
    splitChunks:{
      chunks:"all",//async
      minChunks:1,    //最小需要被多少chunks共同引入
      cacheGroups:{   //缓存组配置
        vendors:{
          test: "", //路径匹配规则,
          priotity:-10, //优先级
        }
      }
    }
  }
}
```
4. preload-webpack-plugin
5. HotModuleReplacementPlugin
- 供dev环境下的文件热更新
6. CleanWebpackPlugin
- 清空dist文件夹

## merge
- 分开生产和dev的属性
- 通过webpack-merge来合并对应的配置


