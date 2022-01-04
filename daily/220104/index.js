const request = require('./limitRequest')

for (let i = 1; i < 20; i++) {
  request.get(`name-${i}`, i * 100).then(res => {
    console.log("获取数据",res);
    
  })
}