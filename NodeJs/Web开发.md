

## 1. web开发模式

> ### 1. 服务端渲染 

优点: 

1.前端耗时少

2. 有利于SEO

缺点：

1. 占用服务器端资源；

2. 不利于前后端分离，开发效率低；

> ###  2. 前后端分离的web开发模式

优点：

1. 开发体验好。前端专注于UI 页面，后端专注于api的开发；

2. 用户体验好。 ajax技术的广泛应用，极大的提高了用户的体验，轻松实现页面的局部刷新

3. 减轻了服务端的渲染压力。

缺点：

不利于SEO 。 因为完整的HTML页面 需要在客户端动态拼接完成，所以爬虫无法爬取页面的有效信息。

解决方案：利用Vue，React 等前端框架的SSR技术能够很好的解决SEO 问题。


## 2.  前后端的身份认证

>  服务端渲染推荐使用 Session 认证机制

> 前后端分离推荐使用JWT 认证机制


## 3. Session 认证机制

> 1. http协议的无状态性

http 协议的无状态性指的是，客户端  **<font color='#42B983' size=4.5 >每次发送的http请求都是独立的, 连续多个请求之间没有直接的关系。服务器不会主动保留每次http请求的状态。</font>**  

> 2. 如何突破http 协议的无状态性?

利用Cookie,cookie 是存储在客户端浏览器中的一段不超过4kb的字符串。

 **<font color='#42B983' size=4.5 >不同域名下的cookie各自独立 </font>**，每当客户端发送请求时, 会  **<font color='#42B983' size=4.5 >自动把当前域名下的 </font>** 所有  **<font color='#42B983' size=4.5 >未过期的cookie </font>** 一同发送到服务器。 

 > Cookie 的特性

 1. 自动发送;

 2. 域名独立;

 3.过期时限;

 4. 4kb 大小  

 > 3. Cookie 在身份认证中的作用

 客户端  **<font color='#42B983' size=4.5 >第一次请求服务器的时候
 </font>** ,服务器  **<font color='#42B983' size=4.5 >通过响应头的形式 </font>**,想客户端发送一个身份认证的Cookie, 客户端将Cookie 保存在浏览器中。

 随后，当客户端浏览器每次请求服务器的时候， **<font color='#42B983' size=4.5 >浏览器会自动将身份认证相关的Cookie  </font>**,通过  **<font size=4.5>请求头的形式 </font>**  发送给服务器，服务器即可验明客户端的身份。

> 4. Cookie 不具有安全性

由于Cookie 是存储在客户端,而浏览器也提供了 读写Cookie 的API， 因此，Cookie 很容易被伪造，不具有安全性。不建议服务器将重要的隐私数据，通过Cookie 的形式发送给浏览器。

> 5. 提供身份认证的安全性以及Session的工作原理

用户输入账号密码登录成功后，服务器将登录成功后的用户信息存储在服务器的内存中，同时生成相应的Cookie 字符串，并将该Cookie 字符串响应给客户端。这样客户端存储的只是Cookie 字符串。

以后每次发送请求，服务端会根据请求头中的Cookie 去查找对应的用户信息，找到了就认证通过，这时才生成响应内容。

## 3. 在Express中使用Session认证

 **<font size=4.5>通过 express-session中间件</font>** 

> 将用户信息，登录状态存储在Session 中
 ```
   // step1: npm install express-session
    const session = require("express-session")
  // step2： 注册全局中间件
    app.use(session({
        secret:"", // 一个字符串
        resave:false,
        saveUninitialized:true
    }))

// 登录请求
    app.post("/api/login",(req,res)=>{
        if(req.body.userName !=="admin" || req.body.password !=="123456"){
            return res.send({
                status:1,
                msg:"登录失败"
            })
        }
  // step3: 将登录成功后的用户信息，保存在Session 中   

  // 只有成功配置了express-session 这个中间件后，才能有req.session 属性

  req.session.user = req.body   // 用户的信息
  req.session.isLogin = true // 将用户的登录状态,存储到Session 中
        res.send({
            status：0,
            msg:"登录成功"
        })

    })


 ``` 

 > 从Session 中取数据

 ```
   app.get("/api/username",(req,res)=>{

       // 中间件共享 req 上的信息，可以取到之前定义在req 上的session 的信息
       if(!req.session.isLogin){
           return res.send({
               status:1,
               msg:"fail"
           })
       }
       res.send({
           status:0,
           msg:"success",
           username:req.session.user.username
       })
   })

 ```

 > 清空Session 

 ```
 // 退出登录接口
   app.post("/loginout",(req,res)=>{

       req.session.destory()
       res.send({
           status:0,
           msg:"退出成功"
       })
   })

 ```


 ## 4.JWT 认证机制

 >  Session 认证的局限性

 Session 认证机制需要配合cookie 才能实现。 但由于cookie 不支持跨域访问，所以，当涉及到

 前端跨域请求后端接口的时候，需要额外做很多配置，相对麻烦。

 
 当前端请求后端接口不存在跨域问题的时候，推荐使用Session 身份认证机制

 当前端需要跨域请求后端接口的时候，推荐使用JWT 认证机制。

 > 什么是JWT ?

 JWT(JSON Web Token)是目前最流行的跨域认证解决方案。

