# vue中svg的使用

# 笔记中参考以下的两篇文章

1. 张鑫旭大佬 关于切图的这篇文章 https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/


2. 懒人神器：svg-sprite-loader实现自己的Icon组件 https://segmentfault.com/a/1190000015367490


## 起因:浏览vue-element-admin 中的源码进行了解

ui中常有提出svg的icon文件
## 优点

1. 能够统一管理所有的svg icon
2. 通过打包之后生成的雪碧图来加载 能够减少请求的次数
3. svg文件能够任意缩放 转换成任意颜色 边缘清晰
4. 支持 ie9+


* svg组件的引入

在main.js进行引入/icon/index.js

```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
// 注册全局组件
Vue.component('svg-icon', SvgIcon)
// 动态引进所有的svg文件,接收的参数是文件夹路径,是否遍历子文件夹,文件名匹配的正则
const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req)
```

svgicon.vue

```vue
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <!-- 判断svg文件的来源 如果是在线的文件 采用另外一种显示-->
  <!-- $listeners 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
    /* 跟随上级的颜色 */
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>


```

同时src中建立icon文件夹对svg文件管理


要分清楚作为图片的svg和icon的svg

vue.config.js
安装svg-sprite-loader 并且对其进行配置
```js
{
  test: /\.svg$/,
  loader: 'file-loader',
  exclude: path.resolve(__dirname, './src/assets/icons') // 不带icon 玩
}
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: path.resolve(__dirname, './src/assets/icons') // 只带自己人玩
}
```

## 页面中引入
icon-class 就是icon的文件名 class就是自定义的css类名
```html
 <svg-icon icon-class="next" class="icon" />
```