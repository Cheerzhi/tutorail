# vue中动画及animate.css的源码解读

## vue中的动画
通过transtion组件来使用动画

1. duration(动画时间)
单位为毫秒;可分别设置进入和离开时长
```html
  <transition :duration='{enter:300,leave:500}'>
  <!-- <transition :duration='1000'> -->
    <div />
  </transition>
```
2. tag(编译标签)(transtion-group才有)
一般是span

3. enter-class/leave-class....动画的类名

4. 事件
before/after - enter/leave 
进入/离开前后调用对应的方法


## animate.css

### vue中的使用

```html
  <transition-group :duration='1000' enter-active-class='animated fadeInLeft' leave-active-class='animated fadeOutRight' @afterEnter="afterEnter">
    <div v-for="(item,index) in list" :key="index" style="width:300px;border:1px solid red;text-align:center;margin:10px">{{index}}</div>
  </transition-group>
```

类名中加入animated以及对应的动画类名才能生效

### 动画源码解读

```css
/* 
  动画属性:
  animation-name:动画名称;
  animation-duration:动画时间
  animation-timing-function:动画的速度曲线
  animation-delay:动画延迟
  animation-iteration-count:动画播放次数 (number/infinity)
  animation-direction:是否轮流发向播放动画
  名称和时长是必须的
 */
/* 
  关键帧来控制动画的效果
 */
 @keyframes bounce{
   from,
   50%,
   to{
     /* 对应css3的动画 */
   }
 }
```

1. bounce(上下弹起)
```css
  /* 
    cubic-bezier
    贝塞尔曲线:调整变速运动的
    ease   从慢变快
    linear 匀速运动 
   */
  @keyframes bounce{
    from,
    20%,
    53%,
    to{
     /* 对应css3的动画 */
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0) scaleY(1.1);
      transform: translate3d(0, -30px, 0) scaleY(1.1);
    }

    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0) scaleY(1.05);
      transform: translate3d(0, -15px, 0) scaleY(1.05);
    }

    80% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
      transform: translate3d(0, 0, 0) scaleY(0.95);
    }

    90% {
      -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);
      transform: translate3d(0, -4px, 0) scaleY(1.02);
    }
  }
```
2. fade(飞入)

改变透明度和位置制作飞入飞出效果
```css
@keyframes fadeIn {
  from {
    opacity: 0;  
    /* -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0); */
  }

  to {
    opacity: 1;
    /* -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0); */
  }
}
```

3. flash(闪电)

来回改变透明度导致闪电效果
```css
@keyframes flash {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}
```

4. rubberband(橡皮筋)

来回改变缩放尺寸
```css
@keyframes rubberBand {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
```
5. shake(横向震动)
```css
@keyframes shakeX {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
```

6. Rotate

rotate3d(x,y,z,deg)旋转中心坐标,加角度

```css
@-webkit-keyframes rotateOut {
  from {
    opacity: 1;
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 200deg);
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0;
  }
}
```
7. slide
```css
@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
```
8. lightSpeed(光速)

skewX(2d转移坐标系,倾斜度)
```css
@keyframes lightSpeedInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }

  60% {
    -webkit-transform: skewX(20deg);
    transform: skewX(20deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: skewX(-5deg);
    transform: skewX(-5deg);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
```