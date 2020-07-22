
## 20. vw 视口单位
## 19. parcel
## 18. 嵌套路由之间的数据传递
## 17.  高度自适应铺满屏幕剩余高度 
              position:absolute;
              top:xx,
              bottom:0
              width:100%
               
## 16. axios 拦截器 做响应拦截 ，路由跳转，引入的路由对象 应该是 /router/index 下的路由
## 15. element-ui 更换主题
## 14. css变量
## 13. grid 布局


## 12. 
 
 最后一个元素的margin 处理方法

this.$route.query拿到整个query对象

更新state的唯一方式是提交mutation

beforeRouteEnter ：（to,from,next）
next(vm=〉｛｝）

路由钩子函数 像使用生命 周期函数一样去使用






## 11. 
Import
挂载的两种方式 mount

Less混合

p:nth-child
P :nth-child的区别

p:nth-of-type 

Emmet  语法
｛｝表示内容
css emment 语法

## 10. 覆盖element-ui 样式  

另外写一个  style></style

## 9. 子组件向父组件传参
   子组件里通过某个事件，触发一个函数，在这个函数里通过this.$emit()方法自定义一个事件，并传递一个参数。 将子组件放进父组件中， 在子组件上监听这个自定义事件，并触发父组件中的某个函数，
   这个函数会拿到子组件传过来的参数作为自己的参数。 这样就达到了子组件向父组件传参的目的。 
## 8. Array.isAarray(arr)  // 返回布尔值

## 1.  router.beforEach(to,from,next)  问题

## 2.  检查登录状态

##  3.  本地存储  localStorage 和sessionStorage   //  sessionStorage  并不是简单的浏览器关闭，数据就销毁


         localStorage.name = "jack" 
         localStorage.setItem("name","jack")
         localStorage.removeItem("name“)
         localStorage.clear();



## 4.  路由嵌套  引入组件  component : ()=> import('@/view/smartsite/myMachines')

         
 ## 5. axios  post请求 后端收不到数据的原因
  https://www.jianshu.com/p/482d61f96075


## 6.   element-ui  

自定义按钮  

    <el-button>默认按钮</el-button> 

     button {
   padding:0  ;    //  一定要设置padding:0 ;
}

自定义  input 框激活的样式
 .el-form-item :focus-within {
                border-color: #FC971E !important;
            }

## 7. import "../a.js" 
 导入a文件 自动执行， 即使a.js中并没有export 导出 






