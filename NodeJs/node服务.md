# 创建node 服务

> 第一步:引入模块

```
const http = require("http")
const fs = require("fs")
```

> 第二步:创建服务器实例对象
```
  let server = http.createServer()
```

> 第三布：为服务器实例对象绑定 request 事件，监听客户端的请求

```
  server.on("request",(req,res)=>{
    res.setHeader("Content-type","text/html;charset=utf-8")
    
    // 根据请求的url, 比如是index.html, 那就调用文件读取。
    // 下面是伪代码
   
    // 假设req.url 拿到的就是要请求的页面
        fs.readFile(req.url,(err,dataStr)=>{
            if(err){
                return console.log("读取失败",err)
            }
            
     // res.end(dataStr)//结束本次请求并将响应内容返回给客户端
    // 一般返回一个html 页面,浏览器再根据html文件，加载执行相关的js css,
        })
   
   
}) 
```

> 第四步： 启动服务器

```
server.listen("8080",()=>{
    console.log("server runing at localhost:8080");
})

```
