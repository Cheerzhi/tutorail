- this的总结

1. 是否由new调用？ 如果是，则绑定到构造函数新创建的实例对象身上。
2. 是否由call或者apply调用？如果是，则绑定到第一个参数指定的对象身上。
3. 是有作为对象的方法调用？如果是，则绑定到这个引用的对象身上。
4. 默认普通函数调用，如果是严格模式则绑定到undefined，否则绑定到全局对象。

- promise

  promise有三个状态、以及then、catch、finally、all、race、allSettled等6个方法
1. pending
2. fulflied
3. rejected

  方法

1. then 成功后的回调
2. catch 失败后的回调
3. finally pending改变状态后必须执行的回调
4. all、race 是多个promise实例中执行的方法 

- all 是全部promise实例完成后的回调 任意一个失败都会产生失败回调
- race 是多个promise实例最先完成的回调
- allSettled 所有的回调都能按照完整的结果返回