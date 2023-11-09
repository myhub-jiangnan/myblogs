# vue 如何实现数据的响应式双向绑定

let obj = {
    msg:"hellow vue"
}

1. 通过js DOM操作 给input的value 赋值，实现单向绑定；

2. 对input 的输入操作通过 input 事件进行监听，拿到输入的值，把输入的值赋给 msg。这样就实现了数据的双向绑定。

3. 实现响应式：  通过Object.defineproperty() 对obj 进行数据劫持，当我们发现msg 被修改了时，input的值就跟着改变。


