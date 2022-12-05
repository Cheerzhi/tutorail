1. prefetch

prefetch 是一种浏览器机制 利用浏览器空闲时间来下载或者预存用户可能访问的文档.
```html
  <link href=static/css/chunk-0018552b.a75d0895.css rel=prefetch>
```
2. preload

preload 则是预加载
能够指明那些资源是在页面加载完后即刻需要的 够使得资源可以更早的得到加载并且可用,更不易阻塞页面的初步渲染
```html
  <link href=static/css/chunk-0018552b.a75d0895.css rel=preload>
```

3. vue-cli中
- preload 会为所有初始化文件自动生成preload提示.
- prefetch 会为所有作为async chunk生成的js文件生成 一般是vue-router进行的异步路由引入

过多的引入异步页面 以及多人开发导致过多的css文件将添加预加载js、css文到html文件中
导致服务器请求进程过多 导致请求超时而无法返回

- 两者均可以通过chainWebpack中的config.plugin('preload/prefetch')进行修改和删除