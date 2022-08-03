const isFunction = variable => typeof variable === 'function'
const PENDING = 'pending'
const FULFILLED = "fulfilled"
const REJECTED = 'rejected'
class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter")
    }
    this._status = PENDING
    this._value = undefined
    // 成功队列
    this._fulfilledQueues = []
    // 失败队列
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  _resolve(val) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = val
  }
  _reject(err) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = err
  }
  then(onFulfilled, onRejected) {
    const {
      _value,
      _status
    } = this
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = value => {
        try {
          if(!isFunction(onFulfilled)){
            // ?
            onFulfilledNext(value)
          }else{

          }
        }catch(e){

        }
      }
    })
  }
}