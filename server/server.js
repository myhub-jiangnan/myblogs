
const http = require("http")

let server = http.createServer((req, res) => {

    console.log("有请求进来了");
    res.end("有请求进来了！")
})


server.listen(1234, () => {
    console.log("server is running at port:1234");
})