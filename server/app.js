const express = require('express')
const app = express()
const fs = require("fs")
const marked = require("marked")

app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html;charset=utf-8")
    // 读文件是异步操作
    fs.readFile(__dirname + "/test.html", 'utf-8',  (err, data)=> {
        if (err) {
            return console.log("读取失败", err);
        }
        console.log("读取成功");
        res.send(data.toString())
    })
})

// 获取markdown
// app.get("/getMarkdown", (req, res) => {
//     res.setHeader("Content-type", "text/html;charset=utf-8")
//     // 读文件是异步操作
//     fs.readFile(__dirname+"/test.html", 'utf-8',(err,data)=>{
//         if (err) {
//             return console.log("读取失败", err);
//         }
//         console.log("读取成功markdown");
//         console.log(data.toString());
//         res.send(data.toString())
//     })
// })

app.listen(9190, () => {
    console.log(`server listening:`)
    console.log("http://localhost:9190");
})