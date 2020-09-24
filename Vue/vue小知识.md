

> 1. new Vue()

```javascript
  new Vue({
      el:"#app",
      router,
      store,
      ....
  })

```
传入的参数都会作为vue实例对象的属性和方法；




> 3. Router

创建路由实例, Router()构造函数有一个routes属性，属性值为一个数组，数组里面的元素为对象，包含路由映射组件的信息；

```javascript
const router = new Router({
    routes
})

```

将路由实例注入vue 跟实例，让整个应用都有路由功能
```javascript
const app = new Vue({
  router
}).$mount('#app')

```
通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由信息


> 4. 路由实例对象有哪些属性和方法
