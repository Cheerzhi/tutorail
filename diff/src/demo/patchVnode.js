import createElement from "./createElement"

export default function patchVnode(oldVnode, newVnode) {
  if (newVnode.children === undefined) {
    //新的节点和旧节点的文本差别
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {

    } else {
      oldVnode.elm.innerText = ''
      for (let child of newVnode.children) {
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}