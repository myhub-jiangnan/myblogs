



const express = require("express")

const fs = require("fs")
const app = express()


app.use(express.static("public"))


app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html;charset=utf-8")
    fs.readFile(__dirname + "/public/1.html", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log("读取成功", data.toString());
        res.send(data.toString())
    })

})


app.listen(90, () => {
    console.log("express server running at http://127.0.0.1:90");
})




// 跨域演示
const app02 = express()

app02.use(express.static("public"))

app02.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.send("port 91 中的内容2")
})

app02.listen(91, () => {
    console.log("express server running at http://127.0.0.1:91");
})








