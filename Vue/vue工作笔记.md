

## 24. 如何避免if 嵌套过深
## 23.  vm.$emit() 和vm.$on() 
  


## 22. 高德地图
   https://blog.csdn.net/weixin_47155055/article/details/105587047
   https://www.jianshu.com/p/0011996b81e2
 
 	a57201c6a1a1b6cc01e104c4c8fd8a78


## 21. JS 值类型和引用类型
    1.值类型放在栈区，访问时按值访问
    ---

    2.delete obj.x  , obj.x 既不是值类型也不是引用类型，是一个表达式，所以delete 这个操作的正式语法设计并不是“删除某个东西”，
    而是“删除一个表达式的结果” 
      delete 0 ,在JavaScript中将0视为一个表达式，并尝试删除它的求值结果；
    ---
    3. 在js 中表达式是一个很独特的东西， 所有表达式的终极目的都是为了得到一个值。 表达式的值，在ECMAScript规范中称为“引用”
    ---
    4. 在js 只有表达式和语句可以被执行并有执行结果。
    ---
    5. x= x 表示的意思是把值x 赋给引用x   //  左手端是引用，右手端是值
    ---
    6. 对象方法调用的来由： 函数调用运算符是（） ，eg： obj.x 对象属性存取运算符".",返回的是关于x的引用（ obj.x 是表达式，表达式的值是引用），如果
        obj.x 只是值，那么它就不能携带obj这个对象；
     --- 
    7. delete x , 当x 是全局对象global的属性时，那么所谓delete x 只需要返回global.x 这个引用就可以了，
    ---
    8. 当delete尝试删除值类型数据时，会返回true, 用于表示没有错误(Error)，本质上什么操作也没做;

        delete 0 的本质是删除一个表达式的值(Result);

        delete x 与上述的区别在于Result 是一个引用(Reference)， 如果x 不存在，也会返回true。这是因为这里的x仍然会得到一个引用，称为UnresolvableReference，
         但是ECMAScript规范约定，如果这里是UnresolvableReference，返回true
        
      延伸扩展：如果访问不存在的变量x报ReferenceError错误，其实是对x表达式的的Result引用做getValue的时候报的错误，然后为啥typeof x和delete x不报错，因为这两个操作没有求值。

        delete 其实只能删除一个引用，即对象成员(Property) , 所以只有delete x  等值于 delete obj.x 时才有执行意义；

        delete undefined 返回false，  而 delete null返回true，  这是因为ECMAScript 规范把undefined 声明成了一个全局属性，并且这个属性是只读的，而null是一个关键字。 delete undefined 是 delete global.undefined 是删除引用，而不是删除值，因此返回false 


        JavaScript关键字(Reserved Words)是指在JavaScript语言中有特定含义，成为语法中一部分的那些字。不能作为变量名和函数名使用，否则会出现编译错误。

        

     


 



---
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






