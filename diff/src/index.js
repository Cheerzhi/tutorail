import h from './demo/h'
import patch from './demo/patch'
let vnode1 = h("div", {}, "你好呀")
let vnode2 = h("div", {}, [
  h("li", {}, "a"),
  h("li", {}, "吧"),
  h("li", {}, "c"),
  h("li", {}, "d"),
])

let app = document.getElementById('app')
console.log(vnode1);
patch(app,vnode2)