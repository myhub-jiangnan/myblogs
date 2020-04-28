##  什么是promise ?
> 从语法的角度来说，Promise 是一个对象，可以获取异步操作的结果。通过Promise 统一提供的API， 可以用同步的流程，解决异步编程的问题，避免传统的回调函数，带来的回调地狱的问题.

> 从工程的角度讲，就是一种异步编程解决方案。

```javascript
     const promise =  new Promise((resolve,rejected)=>{
           // ....code   异步操作
           if(成功){
             resolve(data)
           }else{
               rejected(error)
           }
       })
  
```


## <font color="42B983"> Promise常用API</font>

 ### 1.Promise.prototype.then()
####  then 方法定义在Promise 构造函数的原型对象上，作为Promise 实例对象的回调函数，当Promise 的实例状态为已完成，就调用该方法； 

### 2. Promise.prototype.catch()
#### 与then 方法唯一不同的是，当promise 实例状态为已失败时，就调用catch方法
```javascript
    promise.then(res=>{
        // 对异步操作的结果进行操作
    }).catch(err=>{
        console.log(err)
    })
```
### 3. Promise.prototype.finally()
#### finally 方法表示，无论promise为哪种状态，执行完then 或者catch, 最终都要执行finally里的回调函数

``` 
server.listen(port).then(res=>{

}).finally(server.stop)


```



