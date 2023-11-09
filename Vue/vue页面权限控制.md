
vue 页面权限控制，也就是没有登录，有些页面不能直接通过url 访问

解决步骤：

1. 在路由文件中，给需要控制权限的页面做一个标记

```
 {
        path: "/index",
        name: "index",
        component: () => import("../view/index"),
        meta: {
            title: "首页",
            needLogin: true  
            
        }
    },

```

meta 里的needLogin 字段就是用来标记需要登录才能访问的页面


2. 在登录页面，如果登录成功，在缓存里存一个token

```
if("登录成功"){
      sessionStorage.clear()
      sessionStorage.token = "123456"
}

```

3.  在 main.js  文件中通过全局路由守卫，做页面跳转控制

```
// 路由守卫 权限控制
router.beforeEach(async (to, from, next) => {
  let token = sessionStorage.getItem("token")
  //
  if (to.meta.needLogin) {
    if (!token) {
      next("login")
    }
  }
  next()
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')


```


## 注意事项：
> router.beforeEach()  要写在 new Vue() 的前面, 不然第一次直接在地址栏中输入url, router.beforeEach 不会执行。