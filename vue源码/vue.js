class Vue {
  constructor(options) {
    this.$options = options
    this.$watchEvent = {}
    if (typeof options.beforeCreate == 'function') {
      options.beforeCreate.bind(this)()
    }
    //created时生成data
    this.$data = options.data
    this.proxyData()
    this.observe()
    if (typeof options.created == 'function') {
      options.created.bind(this)()
    }
    if (typeof options.beforeMount == 'function') {
      options.beforeMount.bind(this)()
    }
    //挂载时获取节点
    this.$el = document.querySelector(options.el)
    this.compile(this.$el)
    if (typeof options.mounted == 'function') {
      options.mounted.bind(this)()
    }
  }
  proxyData() {
    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(val) {
          this.$data[key] = val
        }
      })
    }
  }
  observe() {
    for (let key in this.$data) {
      let value = this.$data[key]
      let that = this
      Object.defineProperty(this.$data, key, {
        get() {
          return value
        },
        set(val) {
          value = val
          if (that.$watchEvent[key]) {
            that.$watchEvent[key].forEach((item, index) => {
              item.update()
            })
          }
        }
      })
    }
  }
  compile(node) {
    node.childNodes.forEach((item, index) => {
      if (item.nodeType == 3) {
        // 文本节点
        let reg = /\{\{(.*?)\}\}/g;
        let text = item.textContent
        // 给节点赋予数据
        item.textContent = text.replace(reg, (match, vmKey) => {
          vmKey = vmKey.trim()
          if (this.hasOwnProperty(vmKey)) {
            let watch = new Watcher(this, vmKey, item, 'textContent')
            if (this.$watchEvent[vmKey]) {
              this.$watchEvent[vmKey].push(watch)
            } else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watch)
            }
          }
          return this.$data[vmKey]
        })
      }
      if (item.nodeType == 1) {
        // 元素节点
        if(item.hasAttribute('v-model')){
          let vmKey = item.getAttribute('v-model').trim()
          if(this.hasOwnProperty(vmKey)){
            item.value = this[vmKey]
          }
          item.addEventListener('input',event=>{
            this[vmKey] = item.value
          })
        }
        if (item.hasAttribute("@click")) {
          let vmKey = item.getAttribute("@click").trim()
          item.addEventListener('click', event => {
            this.eventFn = this.$options.methods[vmKey].bind(this)
            this.eventFn(event)
          })
        }
        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      }
    })
  }
}
class Watcher {
  constructor(vm, key, node, attr) {
    this.vm = vm
    this.key = key
    this.node = node
    this.attr = attr
  }
  update() {
    this.node[this.attr] = this.vm[this.key]
  }
}