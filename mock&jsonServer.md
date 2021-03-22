# json-server

* 安装
- mac sudo npm i json-server -g
- win npm i json-server -g 

* 使用

cd到选中的文件夹 
json-server --watch --port 1.json/1.js

* json数据格式

```json
{
  "person":{
    "id":"1",
    "name":"xiaoheng",
    "children":[{"id":"2","name":"xiaoming"}]
  }
}

```

只能根据第一层(person)获取路由
下一层的数据 只能够使用person/1 person?id=1

|获取方式数据|请求方式|例子|
|:----:|:----:|:----:|
|获取所有的数据|get|person|
|分页获取数据| get| /posts?_page=7&_limit=20|
|单条数据|get| person?id=1|
|添加数据| post |person |
|修改数据 | put/patch|person|
|删除数据| delete |/course/1  |