import vnode from './vnode'
export default function h(sel,data,params) {
  if(typeof params == 'string'){
    //无子节点时
    return vnode(sel,data,undefined,params,undefined)
  }else if(Array.isArray(params)){
    //有子节点
    let children = []
    for (let item of params){
      children.push(item)
    }
    return vnode(sel,data,children,undefined,undefined)
  }

}
