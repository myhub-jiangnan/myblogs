

路由就是一对 key 和value的一一对应。

vue 中的路由就是指 组件和 访问路径的一一对应。也就是把组件映射到相应的路径上。

## 安装

```
npm install vue-router

```

## 注册路由

```
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)  // 必须注册这个插件，才能在创建vue 实例的时候，配置roter选项

new Vue({
     el: '#app',
    router, // 配置路由属性
    data(){
        return {

        }
    }

})

```

## 使用路由

```
  let router = new VueRouter({
      routes:[{
          name:"", // 给路由命名,如果命名了，地址栏里显示的就是这里的name, 否则默认是path
          path:"",  // 路径
          component: import("@/views/...."),  // 对应的组件
          meta:{  // 路由元信息
            title:"",
            ....
          },
          children:[{

          }]
      }]
  })

```


##  编程式导航

 this.$router.push({})  

``` 
    //1. params 传参 , 特点： 页面刷新时，参数会消失
    this.$router.push({
        name:"componentName",  // 组件名
        params:{
    
        }
    })

    // 2. query 传参, 带查询参数，变成 /user?name=jack;  页面刷新， 查询参数仍然在
    this.$router.push({
        path:"user" ,  // 路由路径
        query : {
            name:"jack"
        }
    })
```

this.$router.replace()

this.$router.go(-1) // -1,倒退1步;-5倒退5步; 1前进1步



## 动态路由的作用：

当我们想让满足某种匹配规则的路由，全都跳转到同一个组件时，就可以用动态路由.

## 动态路由的使用：

设置path的时候， 以冒号：开头，添加动态路由参数

```javascript
    const router  = new VueRouter({
        routers: [
            {
                path:`user/:userId`,
                component: User
            },
            // 多段路径参数
            {
                path:`user/:userId/:userName`,
                component: UserInfo
            }
        ]
    })
    //  这样 user/001   user/002 都会映射到User 这个组件
    // user/001/jack   user/002/mary  都会映射到UserInfo  这个组件

```


## router-view  路由视图

用路由匹配的组件，来替换  " \<router-view> \</router-view> "


 同时同级展示多个路由,需要用到命名视图

 ```
 <router-view name="A"></router-view>
 <router-view name="B"></router-view>

 ```


```
  <keep-alive :include="['News','Message']">  // 不用include 则 所有的组件都缓存
        
  </keep-alive>

```




## 路由相关的生命周期钩子

路由切换的时候，之前的路由组件会被销毁。

activated(){}  // 组件被激活时，自动调用该函数

deactivated(){}   // 失活时，自动调用该函数


## 路由模式 hash 和histroy的区别

  mode: hash , 地址栏中始终会显示一个#, 但是刷新的时候，页面还是能访问

  mode: histroy, 地址栏中不会显示#，但是刷新后，页面就不能访问了。需要与后端做一个配合，让后端去处理。





 




