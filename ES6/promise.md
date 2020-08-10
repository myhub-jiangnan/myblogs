##  什么是promise ?
> 从语法的角度来说，Promise 是一个对象，可以获取异步操作的结果。通过Promise 统一提供的API， 可以用同步的流程，解决异步编程的问题，避免传统的回调函数，带来的回调地狱的问题.

> 从工程的角度讲，就是一种异步编程解决方案。

> promise 对象代表一个异步操作，有3种状态，通过调用resolve和rejected，决定当前的状态。一旦Promise 被 resolve 或 reject，不能再迁移至其他任何状态，并且任何时候都可以得到这个结果。(这一点不同于事件，事件的特点是 一旦错过，再去监听，是得不到结果。)
  resolve函数的作用是在异步操作成功时调用，将promise 对象的状态从“进行中”变为“已成功”，并将异步操作的结果传递出去；
  rejected函数的作用将promise 对象的状态从“进行中”变为“已失败”，并将异步操作的结果传递出去；

```javascript
    // exmple 1.
     const promise =  new Promise((resolve,rejected)=>{
           // ....code   异步操作
           if(异步操作成功){
             resolve(data)
           }else{
               rejected(error)
           }
       })

    // exmple 2. 
     let promise =  new Promise((resolve,rejected)=>{
         rejected()
         resolve()
     })   
    promise.then(data=>{
        console.log("resolve")
    }).catch(data=>{
        console.log("rejected")
    })
    // 结果：  rejected  ; 因为先调用的rejected函数，promise的状态变成了rejected，不会触发then里的回调函数
```





##   <font color="42B983"> Promise常用API  </font>

 ## 1.Promise.prototype.then()
####  then 方法定义在Promise 构造函数的原型对象上，作为Promise 实例对象的回调函数，当Promise 的实例状态为已完成，就调用该方法； 

## 链式调用

```javascript

    promise.then(data=>{
        return "abc"
    }).then(data=>{
        console.log(data)  // abc
    })

    采用链式的then，then方法指定的回调函数返回的数据， 会作为第二个then方法指定回调函数的参数；
```

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
#### 特点： 只有所有实例的状态都为已完成时, 新生成的实例p状态才会变成 "已完成" ，这时候就可以调用then(),当p1,p2,p3中有一个的状态为 已失败时，p的状态就为已失败，最先失败的实例，返回的错误，会作为p 失败回调函数的参数；


#### 应用场景：
当我们需要所有的异步操作成功时，再进行接下来的操作，就可以用到Promise.all()


## 5. Promise.race()
#### Promise.race（） 与Promise.all（） 都可以将多个promise 实例封装成一个新的promise 实例
```javascrit
 let p = new promise.race([p1,p2,p3])


 p.then()

```
#### 特点： p1,p2,p3 当中，只要有一个率先改变了状态，p 的状态就会跟着改变，最先改变的实例的返回值，就会传给p的回调函数；

----

## 5. Promise.resolve()

将现有对象，转为promise 对象；
1. 如果没有参数，直接返回一个"已成功"状态的promise 对象
2. 参数本来就是一个promise 对象，则原封不动返回该promise 对象；
3. 参数是原始值或者不具有then()方法的对象,则将该对象转为promise





