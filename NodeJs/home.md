# node.js

JavaScript 能操作浏览器是因为浏览器内置了DOM api  和BOM api

浏览器中的 JavaScript运行环境：JavaScript引擎和浏览器提供的api;

JavaScript做后端开发需要借助Node 环境。

powershell快捷键(powershell 比cmd 终端更强大)

shift+右键 打开powershell


tab 补全

esc 能快速清空当前输入的命令

cls 清空终端


# fs- 处理路径问题

  **<font size=4.5>相对路径：</font>**   
fs 读取文件时，如果以 ./ 或者../ 开头， 会有动态路径拼接问题

即 执行node 命令时的路径 +  给出的相对路径

 **<font size=4.5>__dirname</font>** 表示当前文件所在的目录 


 ## 服务器

 对外提供网络资源的电脑就是服务器。普通电脑上安装了web服务器软件(比如Apache等)，就可以称作是服务器了。

 但是在ndoe中 ，我们不需要使用第三方的web服务器软件。因为我们可以基于Node.js 提供的http模块，手写一个服务器软件，从而对外提供web 服务。


 ## 模块

 require 加载自定义模块，可以省略.js 后缀名

 > 模块作用域 ，防止变量全局污染


 ## module 对象

 存储当前模块的相关信息

 > module.exports 对象
 
 该对象，默认情况下是一个空对象；可以通过该对象将模块内的成员共享出去，供外界使用。

 通过require 导入一个自定义模块，得到的成员就是那个模块中，通过module.exports指向的那个对象;

 > 注意： require() 导入模块时，导入结果， **<font size=4.5>永远以module.exports 指向的那个对象为主</font>**  

 ```
    // test.js
     module.exports.name ="jack"
     module.exports.age = 25

     module.exports={
       userName:"peter",
       height:180
     }

    // index.js

const custom=   require("./test")
 
 console.log(custom)

 // {
    userName:"peter",
       height:180
 }

 // 没有name  和age 


 ```

## CommonJs  规范

>  module对象代表当前模块

> module的exports属性，是对外的接口

> require() 加载模块 

## package.json 

package.json 文件的初始化： npm init -y 

执行该命令，该文件的目录，不能包含中文或者空格

> npm install packageName -D   

安装的包只在开发阶段用，项目上线之后不会用到


## i5ting_toc 

将md 文件转换成html 的包

## 模块的加载机制

1. 优先从缓存中加载

2. 内置模块的优先级最高，如果加载的模块同名了。

3. 使用require()加载自定义模块时，必须指定以 ./ 或者../
    开头的 路径标识符。不指定时，node 会把它当做内置模块或第三方模块
4.    


