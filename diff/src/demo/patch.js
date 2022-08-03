import vnode from "./vnode";
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function patch(oldVnode, newVnode) {
  if (oldVnode.sel == undefined) {
    //非虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  if (oldVnode.sel === newVnode.sel) {
    //判断新旧节点
    //相同标签的节点
    patchVnode(oldVnode,newVnode)

  } else {
    //创建新的节点为dom节点
    let newVnodeElm = createElement(newVnode)
    //删除旧节点 插入新节点
    let oldVnodeElm = oldVnode.elm;
    if (newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    }
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}