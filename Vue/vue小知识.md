

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

> 2 . Vue.use()

注册全局插件, 在JavaScript中，一个插件一般是一个对象或者一个函数。

支持vue的插件如果是对象，则该该插件必须提供install(),注册该插件，实质上是执行该插件对象中的install()方法，并且install()会把当前vue实例作为install()的第一个参数

如果是函数，则直接执行该函数，同样会把当前vue实例作为该函数的第一个参数。

所以写vue插件的思路，就是将该插件封装成一个对象，将install()作为该插件的入口方法，在install()中调用插件对象中的其他方法；


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
通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由


> 4. 路由实例对象有哪些属性和方法
