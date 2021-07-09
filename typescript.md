# typeScript

## 数据类型

### 基础数据类型

|数据类型|例子|备注|
|:----:|:----:|:----:|
|boolean|let a: boolean = false||
|number|let a: number = 6|支持二进制、八进制、十六进制|
|string|let a: string = 'cheerzhi'|能够使用模版字符串|
|数组|let list: number[] = [1,2,3]|由子元素规定的类型构成的数组|
|数组|let list: Array<number> = [1,2,3]|数组泛型|
|any|let a:any = 13452|任意类型|
|void|function a():void {console.log('1234') }|方法(函数)无返回值|
|null|let a:null = null||
|undefined|let a:undefined = undefined||
|enum(枚举)||可分成数字枚举、字符串枚举、异构枚举|

null和undefined是所有类型的子类型

### 类

|修饰符|解释|
|:----:|:----:|
|public|公有属性,能够被继承|
|private|私有属性,不能被继承(#属性名也可以为私有属性)|
|static|静态属性|
|readonly|只读属性|

### 变量声明

只用 let 和 const 命名变量;

let 是允许改变变量;const不允许改变值但可以改变内部变量的值

### 接口
```ts
interface Label{
  label?:string
}
function printLabel(label:Label){
  console.log(label.label)
}
let data = {size:10,label:'10的Object'}
printLabel(data)
```

命名接口含有某个字段即可且类型符合即可

### 只读属性

```ts
interface Point {
  readonly x:number;
  readonly y:number;
}
//变量不允许修改
```