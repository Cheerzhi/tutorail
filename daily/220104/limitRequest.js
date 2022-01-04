const mock = require('./requests')
const LimitRequest = function (max) {
  this.max = max
  this.count = 0
  this._task = []
}
LimitRequest.prototype.sendRequest = function (req, ...args) {  
  return new Promise((resolve, reject) => {
    const task = this.createTask(req, args, resolve, reject)
    if (this.count >= this.max) {
      this._task.push(task)
    } else {
      task()
    }
  })
}

LimitRequest.prototype.createTask = function(req, args, resolve, reject) {
  return () => {
    req(...args).then(resolve).catch(reject).finally(() => {
      this.count--
      if (this._task.length) {
        let task = this._task.shift()
        task()
      } else {
        console.log('count =',this.count)
      }
    })
    this.count++
    console.log("开始请求,队列为数量为", this.count);
  }
}

if (typeof Promise.prototype.finally !== 'function') {
  Promise.prototype.finally = function (callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}

const limitP = new LimitRequest(5)

function get (name,time){
  return limitP.sendRequest(mock.get,name,time)
}

module.exports = {get}