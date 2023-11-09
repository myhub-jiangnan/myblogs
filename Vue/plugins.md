# Plugins

插件也就是vue的外挂，可以为Vue添加全局功能的工具代码。



## 当plugin 类型是一个对象

如果插件是一个对象，则该该插件必须提供install(),调用该插件，就会自动执行install方法。

```
 // plugins.js
 export default {
     install(Vue){
         Vue.prototype.$sayHello=()>{
             console.log("Hello Vue !")
         }
     }
 }



```


## 当plugin 类型是一个函数

如果插件是一个函数,调用该插件，就是执行这个函数

```
export default function(Vue){
    Vue.prototype.$sayHi = ()=>{
        console.log("Hi Vue !")
    }
}
```

## Vue.use()

执行Vue.use()  就是将Vue 实例对象传给插件，作为插件的参数。并执行插件中的install()或者函数。






所以写vue插件的思路，就是将该插件封装成一个对象，将install()作为该插件的入口方法，在install()中调用插件对象中的其他方法；

> 用axios 插件的时候，之所以不用执行Vue.use()，是因为axios 完全独立于vue, 不需要传参数。