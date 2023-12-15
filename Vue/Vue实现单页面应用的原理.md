
# vue 项目利用路由实现单页面应用

思路：  

 1.创建一个App 组件, 在创建vue实例的main.js文件中引入。

 2. 在vue 实例化过程中,我们直接将引入的App组件作为模板交给Vue去编译出一个真实DOM。

 3. 用Vue编译出的真实DOM替换index.html 文件中的id 为app 的div。

 4. 最终App组件中是什么内容，index.html 显示的就是什么内容。

 5. 整个项目只创建一个vue实例对象，一个vue实例对象的render函数只能传入一个模板,
 
    因此只需要一个组件(App组件)，只需要一个html 页面(idex.html)。
 
 6. 但是我们要实现多页面的效果怎么办? 那就不断更换App组件里的内容,相应的index.html呈现的页面内容就不一样。
    也就达到了多页面的效果。

 7. 如何实现可以不断更换App组件里的内容? 这里我们就要用到前端路由,即Vue中的vue-router

 8. 比如我们创建很多其他的组件，组件A、组件B、组件C....;通过vue-router 将访问的路径与组件一一映射。

 ```
 export default new VueRouter({
    routes: [
        {
            path: "/A",
            component: () => import("@/components/A")
        },
        {
            path: "/B",
            component: () => import("@/components/B")
        },
        {
            path: "/C",
            component: () => import("@/components/C")
        }
    ]
})

 ```
 当我们访问/A 时,就将组件A放到 App组件中  "\<router-view>\</router-view>\" 所在的位置。
 路由视图router-view 起到的就是一个占坑的作用。


 ```
 // App组件
  <template>
     <div>
          <router-view></router-view>
      </div>
  </template>

 ```
