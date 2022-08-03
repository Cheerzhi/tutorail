export default function createElement(vnode) {
  //创建dom节点
  let domNode = document.createElement(vnode.sel)
  //判断存在子节点
  if (vnode.children == undefined) {
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children)) {
    //递归创建
    for (let child of vnode.children) {
      let childDom = createElement(child)
      domNode.appendChild(childDom)
    }
  }
  vnode.elm = domNode
  return domNode
}