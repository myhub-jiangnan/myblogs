
const express = require("express")
const fs = require("fs")
const app = express()


// 配置跨域中间件

const cors = require("cors")
app.use(cors())

//导入并使用用户路由模块
const userRouter = require("./router/user")

// 添加一个统一的访问前缀
app.use("/api", userRouter)


app.listen(93, () => {
    console.log("express server running at http://127.0.0.1:93");
})











