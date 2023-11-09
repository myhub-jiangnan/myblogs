#  Express




##  1. req.query 

获取url中的查询字符串

## 2. req.params

动态匹配的一个URL 参数

## 3. express.static()

通过这个函数，我们可以创建一个  **<font color='#42B983' size=4.5 >静态资源服务器 </font>**,例如通过如下代码就可以将public目录下的图片，css文件，JavaScript 文件对外开放访问了。 

```

app.use(express.static("public"))
  
```

这样，我们就可以访问public 目录下的所有文件了


## 4. 托管多个静态资源目录

> 如果要托管多个静态资源目录，多次执行

```
 app.use(express.static()) 
``` 

## 5. 在静态资源路径前加访问路径前缀

```
  app.use("/public",express.static("public"))
```

## 6. nodemon 的使用

把node 命令改成nodemon,这样修改了代码。不用每次重新启动服务。


## 7. express 中的路由


> 最简单的方法，是直接将路由挂载在app 实例对象上

```
app.get("/",(req,res)=>{
    res.send("hello node !")
})
  
```

## 8. 模块化路由

为了方便对路由进行模块化管理，Express不建议将路由直接挂载到app 上。而是推荐将路由抽离为单独的模块

> 1.创建路由模块


// router.js
```
    const router = express.Router()

    router.get("/user/list",(req,res)=>{
      res.send("get user list")
    })

 router.post("/user/add",(req,res)=>{
      res.send("get user add")
    })

//  最后向外导出路由对象

 module.exports = router

```
> 2. 导入路由模块

```
const router = require("./router")
  
```


> 3. 注册路由模块

```
    app.use(router)

```

## 9. app.use()的作用

用来注册全局中间件

## 10. 为路由模块添加前缀

```
  app.use("/api",router)
```

## 读取文件

// index.js  public文件夹与index.js 同级

// 访问此服务，返回 public 下的1.html

```

const express = require("express")

const fs = require("fs")

const app = express()


app.use(express.static("public"))
 
app.get("/",(req,res)=>{
    res.setHeader("Content-type", "text/html;charset=utf-8")
    fs.readFile(__dirname+"/public/1.html","utf-8",(err,data)=>{
        if(err){
            return console.log(err);
        }
        console.log("读取成功");
        res.send(data.toString())
    })
 
})

app.listen(90, () => {
    console.log("express server running at http://127.0.0.1:90");
})


```


## 11. 什么是中间件?

业务处理中的中间环节，有输入输出。必须包含next 形参，next是一个回调函数。

```
  function(req,res,next){
      next()
  }
```

## 12. 全局生效中间件

客户端发起的任何请求，到达服务器后，都会触发的中间件，叫作全局生效中间件。

中间件会对所有的请求做预处理，然后交给相应的路由处理

app.use((req,res,next)=>{
  console.log("这是最简单的中间件函数")
  next()
})

## 13. 中间件的作用

多个中间件，共享同一份 req 和res, 这样我们可以在上游的中间件中为req 和res 对象添加自定义的属性或方法，供下游的中间件或路由使用。起到了传递数据的作用。


## 14. 局部生效中间件

```
   const mw = (req,res,next)=>{
     console.log("这是一个中间件函数")
     next()
   }
   app.get("./",mw,(req,res)=>{

     res.send("HOME PAGE")

   })

```
把中间件放在监听路由的中间，只对当前中间件生效。

## 15. 定义多个局部中间件

```
   const mw = (req,res,next)=>{
     console.log("这是一个中间件函数")
     next()
   }
    const mw = (req,res,next)=>{
     console.log("这是一个中间件函数")
     next()
   }
   app.get("./",mw,(req,res)=>{

     res.send("HOME PAGE")

   })

```

## 16. 自定义中间件

>  监听req的 data 事件,当接收发送的请求时，就会触发data 事件

```
  req.on("data",()=>{

  })
```

>监听 req 的end 事件，当请求体数据接收完毕，就会触发end 事件

```
  req.on("end",()=>{

  })

```

##  17.使用Express 写接口


> get 接口(req.query 查询字符串)
```
  const express = require("require")
  const router = express.Router()

  // 加载对应的路由

  router.get("/get",(req,res)=>{
    const query = req.query
    res.send({
      status:0,
      msg:"GET请求成功!",
      data:query
    })
  })

  module.express = router

```

> post 接口 (req.body 查询请求体)
```
  const express = require("require")
  const router = express.Router()

  // 加载对应的路由

  router.post("/post",(req,res)=>{
    const query = req.body
    res.send({
      status:0,
      msg:"GET请求成功!",
      data:query
    })
  })
  module.express = router

```

## 18. CORS 解决跨域问题

CORS  方案解决接口跨域的问题

cors 是 Express 的一个中间件，通过安装和配置cors中间件,可以解决跨域问题

```
// 1.  npm install cors 安装中间件
const cors = require("cors")

// 在路由之前调用如下代码
app.use(cors())
  
```
## 19. 在项目中操作MySQL













