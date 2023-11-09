# Promise 对象


 ## 出现的背景：

> 回调地狱

```javascript
  setTimeout(() => {
            console.log(1);
            setTimeout(() => {
                console.log(2);
                setTimeout(() => {
                    console.log(3);
                }, 1000)
            }, 1000)
        }, 1000)

```

嵌套过深，可读性差，难以维护。


Promise对象的主要用途通过链式调用的结构，将原本回调嵌套的异步处理流程，转化成

"对象.then().then()..." 的链式结构。虽然仍然离不开回调函数，但是结构更清晰。

## 用Promise来解决

```javascript
  
//使用Promise拆解的setTimeout流程控制
var p = new Promise(function(resolve){
  setTimeout(function(){
    resolve()
  },1000)
})
p.then(function(){
  //第一秒后执行的逻辑
  console.log('第一秒之后发生的事情')
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve()
    },1000)
  })
}).then(function(){
  //第二秒后执行的逻辑
  console.log('第二秒之后发生的事情')
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve()
    },1000)
  })
}).then(function(){
  //第三秒后执行的逻辑
  console.log('第三秒之后发生的事情')
})

```
> 缺点：

用promise 来解决代码量增加了。(后面有方法解决，先不讨论这个问题。)

## Promise 对象

Promise本身具备3种状态

> pending:  就绪状态。

这时已经初始化了Promise,并注册了对象上的所有任务。

```
 // 传入一个同步的回到函数
  let p = new Promise(fn) 
```


> fulfilled: 已完成。

执行了resolve(ars) 回调函数, then()函数注册的回调函数才会执行。并且resolve()的参数会传给then()的回调函数作为自己的参数。

 并且一旦执行了resolve(),**<font size=4.5>状态就锁定了，变成fulfilled.</font>** 执行reject()无效

```
  resolve(ars)

  p.then(ars=>{

  })

```

> rejected：已拒绝。

执行了reject() 回调函数, catch()函数注册的回调函数才会执行。

一旦执行了reject(), **<font size=4.5>状态就锁定了，变成rejected.</font>**。 执行了resolve()无效


```javascript
new Promise(function(resolve,reject){
  resolve()
  reject()
}).then(function(){
  console.log('then执行')
}).catch(function(){
  console.log('catch执行')
}).finally(function(){
  console.log('finally执行')
})
```

 **<font color='#42B983' size=4.5 >只会输出then 执行和finally 执行。 </font>** 


 ```javascript
new Promise(function(resolve,reject){
  reject()
  resolve()
}).then(function(){
  console.log('then执行')
}).catch(function(){
  console.log('catch执行')
}).finally(function(){
  console.log('finally执行')
})
```
**<font color='#42B983' size=4.5 >只会输出catch 执行和finally 执行。 </font>** 


## then 的链式调用原理

**then()的每次执行会返回一个新的Promise对象，而这个新promise对象的then()执行必须等其内部的resolve()执行**

```javascript
  var p = new Promise(function (resolve, reject) {
            resolve('我是Promise的值')
        })
        var p1 = p.then(function (res) {

        })
        console.log(p)  //我是Promise的值

        console.log(p1)  // Promise

        console.log(p1 === p) // false

```

我们会发现返回的p和p1 的状态本身就不一样，并且他们的对比结果是false，这就代表他们在堆内存中开辟了两个空间，p和p1对象分别保存了两个Promise对象的引用地址，所以then函数虽然每次都返回Promise对象，来实现链式调用，但是then函数每次返回的都是一个新的Promise对象。这样便解释的通了！也就是说每一次then函数在执行时，我们都可以让本次的结果在下一个异步步骤执行时，变成不同的状态，而且这也不违背Promise对象最初的约定。


## 关于Async和Await

经过了Generator的过渡之后异步代码同步化的需求逐渐成为了主流需求，这个过程在ES7版本中得到了提案，并在ES8版本中进行了实现，提案中定义了全新的异步控制流程。

```javascript
//提案中定义的函数使用成对的修饰符
async function  test(){
  await ...
  await ...
  
}
test()
```

查看代码结构之后我们发现他的编写方式与Generator函数结构很相似，提案中规定了我们可以使用async修饰一个函数，这样就能在该函数的**直接子作用域中**，使用await来自动的控制函数的流程，await 右侧可以编写任何变量或对象，

当右侧  **<font color='#42B983' size=4.5 > 是普通对象的或变量时候 </font>**  是普通对象的或变量时候，函数会自动返回右侧的结果并向下执行，

 **<font color='#42B983' size=4.5 > 而当await右侧为Promise对象时，如果Promise对象状态没有变成完成，函数就会挂起等待，直到Promise对象变成fulfilled，程序再向下执行，并且Promise的值会自动返回给await左侧的变量中。 </font>**  async和await需要成对出现，async可以单独修饰函数，但是await只能在被async修饰的函数中使用。

有了await和async就相当于使用了自带执行函数的Generator函数，这样我们就不再需要单独针对Generator函数进行开发了，所以async和await逐渐成为主流异步流程控制的终极解决方案。而Generator慢慢淡出了业务开发者的舞台，不过Generator函数成为了向下兼容过渡期版本浏览器的候补实现方式，虽然在现今的大部分项目业务中使用Generator函数的场景非常的少，但是如果查看脚手架项目中通过babel构建的JavaScript生产代码，我们还是能大量的发现Generator的应用的，他的作用就是为了兼容不支持async和await的浏览器。

### 认识async函数

创建如下函数，执行并查看控制台输出：

```javascript
async function test(){
  return 1
}
let res = test()
console.log(res)
```

输出控制台如下：

```sh
Promise {<fulfilled>: 1}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: 1
```

根据控制台结果我们发现其实async修饰的函数，本身就是一个Promise对象，虽然我们在函数中return的值是1，是使用了async修饰之后，这个函数运行时并没有直接返回1，而是返回了一个值为1的Promise对象。

接下来我们测试如下流程，先分析运行结果，猜测输出的顺序：

```javascript
async function  test(){
  console.log(3)
  return 1
}
console.log(1)
test()
console.log(2)
```

执行该流程之后发现输出的结果是1，3，2。很惊喜是不是！按照Promise对象的执行流程function被async修饰之后它本身应该变成异步函数，那么他应该在1和2输出完毕之后在输出3，但是结果却出人意料，这又一次打破了单线程异步模型的概念。

别急，冷静一下，先回想一下Promise对象的结构：

```javascript
new Promise(function(){

}).then(function(){

})
```

我们在介绍Promise对象时，特别介绍了一下回调函数，并且强调他是一个极少数的既使用同步回调流程又使用了异步的回调流程的对象，所以在new Promise时的function是同步流程。现在介绍这个和刚才的输出有关系吗？当然有，接下来查看下面的逻辑，还是先猜测一下输出顺序：

```javascript
async function  test(){
  console.log(3)
  var a = await 4
  console.log(a)
  return 1
}
console.log(1)
test()
console.log(2)
```

我们发现奇怪的事情又发生了，控制台输出的顺序是1，3，2，4

按照我们一开始以为的流程，test函数应该是同步逻辑，那么3和4应该是连着输出的，他不应该会出现3在2之前4在2之后输出的情况，这个同步逻辑和异步逻辑都说不过去，那么我们将当前的函数翻译一下，由于async修饰的函数会被解释成Promise对象，所以我们可以将其翻译成如下结构：

```javascript
console.log(1)
new Promise(function(resolve){
  console.log(3)
  resolve(4)
}).then(function(a){
  console.log(a)
})
console.log(2)
```

看到这个Promise对象我们就豁然开朗，由于初始化的回调是同步的所以1，3，2都是同步代码而4是在resolve中传入的，then代表异步回调所以4应该最后输出。

综上所述，async函数中有一个最大的特点，就是第一个await会作为分水岭一般的存在，在第一个await的右侧和上面的代码，全部是同步代码区域相当于new Promise的回调，第一个await的左侧和下面的代码，就变成了异步代码区域相当于then的回调，所以就出现上面我们发现的灵异问题。

### 最终的setTimeout解决代码

经过了两个时代的变革，现在我们可以使用如下的方式来进行流程控制，不再需要依赖自己定义的流程控制器函数来进行分步执行，这一切的核心起源都是Promise对象的规则定义开始的，所以最终我们的解决方案如下。

```javascript
async function test(){
  var res1 = await new Promise(function(resolve){
    setTimeout(function(){
      resolve('第一秒运行')
    },1000)
  })
  console.log(res1)
  var res2 = await new Promise(function(resolve){
    setTimeout(function(){
      resolve('第二秒运行')
    },1000)
  })
  console.log(res2)
  var res3 = await new Promise(function(resolve){
    setTimeout(function(){
      resolve('第三秒运行')
    },1000)
  })
  console.log(res3)
}
test()
```



## 总结

从回调地狱到Promise的链式调用到Generator函数的分步执行，再到async和await的自动异步代码同步化机制，经历了很多个年头，所以面试中为什么经常问到Promise，并且重点沿着Promise对象深入的挖掘去问你各种问题，主要是考察程序员对Promise对象本身以及他的发展历程是否有深入的了解，同时也是在考察面试者对JavaScript的事件循环系统和异步编程的基本功是否足够的扎实。Promise和事件循环系统并不是JavaScript中的高级知识，而是真正的基础知识，所以所有人想要在行业中更好的发展下去，这些知识都是必备基础，必须扎实掌握。我们未来对自己的定位是软件开发/研发工程师，并不是码农～









 