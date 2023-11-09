
const express = require("express")
const router = express.Router()


router.get("/login", (req, res) => {
    res.send({
        name: "jack",
        age: 50,
        tips: "用户登录成功"
    })
})

router.get("/test", (req, res) => {
    res.send({
        name: "jack",
        age: 50,
        tips: "测试路由模块成功!"
    })
})


module.exports = router