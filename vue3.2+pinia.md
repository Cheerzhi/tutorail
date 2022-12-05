1. setup script 改变
```js
<script setup>

import { defineProps, defineEmits} from "vue";
import { useRouter } from "vue-router";
defineProps({
  title: {
    type: String,
  },
  hidden:{
    type:Boolean,
    default:false,
  }
});

const router = useRouter()
const back = () =>{
  router.back()
}
</script>

```

作为单文件组件编译时的语法糖

1.1 不需要return 方法和数据(减少写法上注册变量和方法的问题)

1.2 不能同时写多个defineProps/defineEmits

系统会报错,单文件组件内部使用setup script时不应糅合过多业务逻辑

1.3 下面的组合式写法能够更好的把业务逻辑所需的数据和方法汇总起来、方便维护
```js
<script>
  props:{
    name:{
      type:String,
      default:"zhi"
    }
  },
  setup(props,{emit}){
    const changeName = () =>{
      emit('change-name','xiaoming')
    }
    return {
      changeName
    }
  }
</script>

```

2. template模版上的ref

与vue2相比 取消了调用其绑定的组件 从而获得该组件的方法以及数据

- 类似一个document.getElement()的调用来获取节点
- 自定义组件是无法调用内部方法的
- 原生dom节点中的属性、方法,可以通.value来调用

3. ref和reactive的区别
```js
import {  reactive,ref,onMounted  } from 'vue';
const name = reactive([])
const nameRef = ref('initialValue')
onMounted(()=>{
  name[0] = ''
  nameRef.value = "12"
})
</script>

```

- reactive更适合定义深层次的数据类型(对象和数组)、
- ref适合定义简单的数据类型
-  修改reactive内某个变量或者属性:state.xxx = val
-  修改ref的数据:xxx.value = val
- reactive的返回值是proxy对象而不是值
- ref本质上也是reactive,ref(obj)等价于reactive({value:obj})
```js
const nameRef = ref(123)
const name = reactive({name:123})
nameRef.value === name.name //输出为true


const nameRef = ref(123)
const name = reactive(123)
nameRef.value === name //true
nameRef === name //false
```


4. 自定义通用组件的注册

SFC文件中
必须要在setup script下面使用
```js
// 常用的是定义props、接收的属性 emits自定义事件名
// 事件中可以使用回调函数校验数据是否合法
import { defineProps,defineEmits } from "vue";
defineProps({
  title: {
    type: String,
  },
  hidden:{
    type:Boolean,
    default:false,
  }
});
defineEmits(['infocus','submit'])
```
main.js中进行注册

```js
import layout from '@/layout/index.vue'
// const app = createApp(App)
// app.component('Layout',layout)
// app.mount("#app")
createApp(App).component("Layout", layout).mount('#app')
```


5. pinia 的使用

与vuex的相比
- 取消了mutation这一api
- action能够为同步和异步的方法
- 有组合式、option式的写法
- 取消modules这一api通过不过定义新的仓库来进行仓库管理;没有整体的概念

选项式
```js
export const useStore = defineStore('user', {
  state: () => ({
    user: ""
  }),
  getters:{
    GET_USER:state=>state.user
  },
  actions:{
    async SET_USER(){
      //处理user的回调或者执行的请求之类
    }
  }
})

```

组合式的方法

- ref相对state中的数据命名
- computed相对于getters
- function则是action
```js
export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const userType = ref('')
  const generateUserType = computed(() => {
    let typeObj = {
      admin: "管理员",
      visitor: "访客"
    }
    return typeObj[userType.value] || '未登陆'
  })

  function SET_USER(user) {
    return new Promise((resolve, reject) => {
      toLogin(user).then(res => {
        userName.value = res.data.user.name
        userType.value = res.data.userType
        setToken(res.data.token)
        resolve()
      }).catch(err => {
        reject()
      })
    })
  }
  function LOG_OUT(){
    return new Promise((resolve,reject)=>{
      toLogout().then(res=>{
        userName.value = ''
        userType.value = ''
        resolve()
      },err=>{
        reject(err)
      })
    })
  }
  return {
    userName,
    userType,
    generateUserType,
    SET_USER,
    LOG_OUT
  }
})
```

- SFC文件通过引入对应仓库进行调用其方法(action)
或者使用mapState或者mapGetters、mapActions(选项式)来进行引入
不需要像以前通过dispatch方法来调用action
```js
import {useUserStore} from '@/store'
export default defineComponent({
  setup(props){
    const userStore = useUserStore()
    const logout = ()=>{
      userStore.LOG_OUT().then(res=>{
        router.replace({name:"login"})
      })
    }
    return  {
      logout
    }
  },
  computed:{
    ...mapState(useUserStore,['userName',"generateUserType"])
  }
  
})
```

- 页面和组件之中需要用到仓库内的数 使用storeToRefs来进行解构

defineStore的返回值本质上是一个reactive;直接使用解构就会失去响应式的本质

- 变更state的方法

```js
const store = useStore()
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})

```