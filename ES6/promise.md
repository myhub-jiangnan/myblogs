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


##   <font color="42B983"> Promise常用API  </font>

 ## 1.Promise.prototype.then()
####  then 方法定义在Promise 构造函数的原型对象上，作为Promise 实例对象的回调函数，当Promise 的实例状态为已完成，就调用该方法； 

## 2. Promise.prototype.catch()
#### 与then 方法唯一不同的是，当promise 实例状态为已失败时，就调用catch方法
```javascript
    promise.then(res=>{
        // 对异步操作的结果进行操作
    }).catch(err=>{
        console.log(err)
    })
```
## 3. Promise.prototype.finally()
#### finally 方法表示，无论promise为哪种状态，执行完then 或者catch, 最终都要执行finally里的回调函数

``` 
server.listen(port).then(res=>{

}).finally(server.stop)

```
## 4. Promise.all()
#### Promise.all() 用于将多个promise 实例封装成一个新的promise 实例 ；
```javascript
     const p1 = new Promise (),
           p2 = new Promise(),
           p3 = new Promise ();
  let p =  promise.all([p1,p2,p3])
  
  p.then(res=>{
       let res1 = res[0],
           res2 = res[1],
           res3 = res[2]
   }).catch(err=>{
       console.log(err);
   })
```
#### 特点： 只有所有实例的状态都为已完成时, 新生成的实例p状态才会变成 "已完成" ，当p1,p2,p3中有一个的状态为 已失败时，p的状态就为已失败，最先失败的实例，返回的错误，会作为p 失败回调函数的参数；

#### 应用场景：
当我们需要所有的异步操作成功时，再进行接下来的操作，就可以用到Promise.all()

## 5. Promise.race()
#### Promise.race（） 与Promise.all（） 都可以将多个promise 实例封装成一个新的promise 实例
```javascrit
 let p = new promise.race([p1,p2,p3])

```
#### 特点： p1,p2,p3 当中，只要有一个率先改变了状态，p 的状态就会跟着改变，最先改变的实例的返回值，就会传给p的回调函数；





