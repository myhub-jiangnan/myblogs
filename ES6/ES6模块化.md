# 组件化开发

## 组件化开发的意义：

1.可以避免一些全局变量之间的污染； 只要导出的组件名不同，就可以避免全局变量名冲突；

2. 增加代码的可复用性；

## ES5 实现组件化开发的方法：

``` javascript
  //  a.js 文件中
  const moduleA = (function(){
     var name = "jack",
     function showName(){
     console.log（this.name）；
}    
   var obj = {
     name: this.name;
     showName : this.showName();
}
  return obj ；
  })()

// b.js 文件中
   《script src="a.js"></script》
     moduleA.name ;
     moduleA.showName();
```

## ES6实现组件化开发的方法：

 ES6 直接实现了组件化开发可以直接将某个变量暴露出去，其他地方要用直接导入进来就行

```javascript
 // a.js 文件 
  var name ="jack",
  var showName = function(){
    console.log（"showName 方法"）；
}
 export {name:name,showName:showName} 或者直接用对象字面量增强写法： export {name,showName}
// b.js 文件
  《script src="a.js" type="module"></script》
<font color="red" size="5">// 注意： type必须是module，文件是私密的，必须import来能复用代码；</font> 
  import {name ,showName} form "../a.js"  <font color="red" size="5">// 注意： 导入的时候变量名必须同名</font> 

## export 和 export default 的区别

1. export 可以用来导出多个对象： export {}     // 必须用大括号括起来
   export default 只能用来导出一个对象： export default obj    // 不需要大括号

2. 导出方式的不同，引入的方式也不同
   export 导出的， import 引入的时候也要加{} ：  import { obj1,obj2}  from "../" 
   
   export default导出的： 引入的时候可以修改变量名：   import  newName from "../"