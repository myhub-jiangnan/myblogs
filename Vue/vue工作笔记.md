

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



