# React

## 兼容性
IE9以上

# JSX的拓展

## 引入
* react.js      react的核心功能
* react-dom.js  提供DOM和虚拟DOM的功能
* babel.js      react使用ES6和浏览器不支持的JSX的语法,引入Babel进行编译


### JSX语法

在js代码中使用html标签,通过编译器(babel)转成js后由浏览器执行
注意事项:
* 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；
* 遇到代码块（以 { 开头），就用 JavaScript 规则解析；
* 使用jsx的script标签都需要加上type="text/babel"  
* jsx代码中,同为js关键字的html属性不能直接使用
    * class -> className,
    * for ->htmlFor
    * tabindex -> tabIndex
    * autofocus -> autoFocus
* style 属性的值接收一个对象，css 的属性必须为驼峰写法
>style={{"backgroundColor":"#f60"}}
* 花括号`{}`内为js表达式,不允许出现var、let、const等关键字

条件判断 通过if/else 或者三元运算符来进行判断
列表渲染(相对于v-for) 可用于js中的数组的map、filter方法进行遍历

### 事件处理


* 采用驼峰式写法（如：onClick,onKeyDown）

### event对象与事件处理函数传参

* 默认绑定方式
    + 事件处理函数的第一个参数为event对象（与原生js一致）
    + 无法传递其他参数
    ```js
        //定义
        clickHandler(e){
            console.log(e);
        }

        //使用
        <button onClick={this.clickHandler}>按钮</button>
    ```
* bind方式
    + event事件对象会在所有参数后隐式传递
    ```js
        //定义
        clickHandler(num1,num2,e){
            console.log(num1,num2,e);
        }

        //使用
        <button onClick={this.clickHandler.bind(this,10,20)}>按钮</button>
    ```
* 使用箭头函数调用
    + event对象需要手动传递
    + 可以传递其他参数
    ```js
        //定义
        clickHandler(e,num){
            console.log(e,num);
        }

        //使用
        <button onClick={e=>this.clickHandler(e,10)}>按钮</button>
    ```

### 事件处理函数中的this指向

```js
    <button onClick={this.clickHandler}>按钮</button>
```

>以上clickHandler被调用时，内部的this不指向组件实例，也不指向button元素，而是得到undefined，如果需要用到this需要使用以下方式改变this指向

* bind方法
    + 执行时bind
    + 初始化时bind
* 使用箭头函数
    + 定义时使用箭头函数
    + 执行时使用箭头函数

### 函数组件与class组件

* 函数组件
>相当于无状态组件 纯展示使用 根据props的传入来展示

特点 
  - 组件不会被实例化,渲染性能得到提升
  - 组件不能访问this对象
  - 组件无生命周期


* class组件(状态组件)

### 组件属性props
>是一个对象,包含使用组件时所有的属性 属性必须为只读(只能从父组件进行修改)

默认值:defaultProps
```js
//react 16前的写法
    function app (props){
        props.name = props.name||'cheerzhi'
        return (<div>my name is {props.name}</div>)
    }
//  react 16后的写法
    app.defaultProps = {
        name:'cheerzhi'
    }
    // es6的写法
    static defaultProps = {
        opacity:1.0
    };
```
属性的类型和校验

```js
    import PropTypes from 'prop-types';
    app.propTypes = {
        name:PropTypes.string,
        optionalBool: PropTypes.bool,
        optionalFunc: PropTypes.func,
        optionalNumber: PropTypes.number,
        optionalObject: PropTypes.object,
        optionalString: PropTypes.string,
        optionalSymbol: PropTypes.symbol,
        //自定义校验
        customProp: function(props, propName, componentName) {
            // 正则表达式
            if (!/matchme/.test(props[propName])) {
                // 返回一个错误来校验
              return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
              );
            }
        },
    }
```

### state和setState

state相当于vue当中的data 

setState是异步的操作state数据方法
```js
setState({},()=>{
    //接受一个回调函数用于处理数据改变后的下一步操作
})
```

dangerouslySetInnerHTML
插入html文本的方法
```js
render(){
    return (<div dangerousluSetInnerHTML={{__html:this.state.newHTMLString}}></div>)
}
```

### refs

* 字符串

```js
    fun = () => {
      console.log(this.demoInput.value);
    }
    render(){
      return (
        <div>
          <input type="text" ref="demoInput" />
          <button onClick={this.fun}>{this.state.isLogin?'退出':"登陆"}</button>
        </div>
      )
    }
```

* 回调函数

```js
    fun = () => {
      console.log(this.demoInput.value);
    }
    render(){
      return (
        <div>
          <input type="text" ref={(input)=>{this.demoInput=input}} />
          <button onClick={this.fun}>{this.state.isLogin?'退出':"登陆"}<button>
        </div>
      )
    }
```
* React.createRef()

通过定义变量保存对应节点 current属性返回对应的节点
```js
    constructor(props){
      super(props);
      this.state =  {
        msg:"Hello World",
        isLogin:false
      }
      this.myRef = React.createRef()
    }
    fun = () => {
      console.log(this.myRef.current);
    }
    render(){
      return (
        <div>
          <input type="text" ref={this.myRef} />
          <button onClick={this.fun}>{this.state.isLogin?'退出':"登陆"}<button>
        </div>
      )
    }
```
### state & props

state是组件内的数据
props是接收其他组件传入该组件的数据 修改其数据只能从父组件中修改

state中的数据改变之后 通过diff算法自动更新虚拟dom
props的数据需要触发render方法来强制更新虚拟dom

constructor的补充
```js
class App extends React.Component{
      // es6的语法
      // 子类写不写constuctor new实例的时候会自动补上constructor
      // 若写上constructor 就必须写上super() 就是指向父类的构造方法
      constructor(props){
        // 如果想使用props 必须super中补上props
        super(props)
        this.state={
          name:"123"
        }
      }
    }

```
组件中多个根节点:

* Fragment的使用:
* 空标签的使用: 
```js
import React, { Component, Fragment } from 'react'
import ImgA from "../assets/1.jpg"
export default class home extends Component {
  render() {
    return (
      // <Fragment key={item.id}>
      // 接收一个key用来区分 加快渲染速率
      <>
        <div>123</div>
        <div>12314</div>

        // 三种引用方法
        <!-- <img src="1.jpg"/> -->
        <img src={ImgA} /> 
        <img src={require("../assets/1.jpg")} />
        </>
      // </Fragment>
    )
  }
}

```

### 组件传值
* 父子传值

* pubsub-js传值(订阅发布 传值)


### 组件生命周期

* Mounting: