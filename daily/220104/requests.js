// function get (name,time){
//   return mock("get",name,time)
// }

function mock(name, time) {
  return new Promise((resolve, reject) => {
    console.log("begin", name)
    setTimeout(() => {
      console.log('end', name, time)
      resolve(name)
    }, time)
  })
}

module.exports = mock