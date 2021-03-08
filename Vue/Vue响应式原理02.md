
# vue 响应式原理详解

>  这里是vue 的单值响应式，这种响应式针对的值是string 或number。关于对象的响应式在Vue响应式原理03中


响应式要解决的问题就是当a依赖了b,b的值更改了后，a的值也更新；


### 响应式应用的场景


```
  let a = 10
  let b = a+15
  console.log(b) // 25
  a = 15
  console.log(b) // 25

  如上所示，b依赖了a , 当a 的值更新后，再打印b, b的值没变

  要想b的值更新得重新执行命令
  b= a+15  // 30

 
```

### 把上面的例子做一个封装

```
  let a = 10 
  let b
  
  let update = ()=>{
      b=a+15
      console.log(b)
      }

  update()  // 25

  a= 15
  update() //30    

  如上所示，当a的值更新了，只有调用update()，b的值才更新
  

```

### 接着上面的情况，我们思考，有没有什么办法，当a的值更新了，我们不用每次都手动调用update()去更新b
### 的值，有没有什么办法可以监听a的值的变化，当a的值变化了，自动调用update()


> 


### 第一步 让一个值的读取和赋值可以被监听

```
 // 声明一个全局变量 用来接收依赖
    let currentEffect;
    class Dep{
        constructor(val){
            // 创建一个数组，收集依赖
            this.effects= new Set()
            this._val = val
        }
        // 对age 属性的读取操作进行拦截
        get age(){
            // 监听Dep 实例的值，读取该值的时候就会产生依赖，并且触发getter， 执行depend()将依赖收集
            this.depend()
            return this._val
        }
         // 对value 属性的赋值操作进行拦截
        set age(newAge){
            // 监听Dep 实例的值，有赋值操作时触发setter, 如果赋了新值，执行notice(),将依赖里的赋值操作执行一遍
            if(this._val !==newAge){
                this._val = newAge
                // 有新的赋值操作，执行notice()
                this.notice()
            }
        }
        //收集依赖 
        depend(){
            // currentEffect 有值则表明有依赖
            if(currentEffect){
                // 有依赖就添加到 专门收集依赖的数组effects 中
                this.effects.add(currentEffect)
            }
        }
        // 触发依赖
        // 也就是遍历存放依赖的数组，数组里存放的都是封装了引用操作的函数，执行函数重新赋值一次，达到更新数据的作业
        notice(){
            this.effects.forEach(item=>{
                item()
            })
        }

```


### 第二步 创建收集依赖的方法

```
 // 所谓依赖，就是一个引用操作，我们把引用操作封装到一个函数里，把这个函数收集起来，就相当于把依赖收集起来了
    // 下面的effectWatch 就是用来收集依赖，effect 是一个回调函数，回调函数里是具体的引用操作

    // 收集依赖的函数
    let effectWatch = function(effect){
        // 把依赖赋值给全局变量currentEffect 
         currentEffect = effect
        // 执行回调函数 注意一定要执行回调，这样回调函数里的引用操作才会执行
         effect()
         currentEffect= null
    }
```


### 第三步 创建依赖

```
     // 声明变量b， 依赖Dep 实例的值 ，就像上面的例子中 b 依赖了a
    let b
    let dep = new Dep(10)

 ```

  > ## 核心 执行 effectWatch() ,在effectWatch的回调函数里建立依赖,这个回调函数就会被收集存到dep 实例的effects数组中
  
 ```   
    effectWatch(()=>{
        // 注意 这里读取和赋值的必须是age属性,因为我们只对age属性做了拦截处理，
        // dep 对象的其他属性 我们还没有做拦截处理，所以我们这里是单值响应式，只有age 属性是响应式的
        b= dep.age+15
        console.log(b);
    })

  ```
  > ## 读取dep.age时，getter 就会监听到，自动将effectWatch 的回调函数 收集起来


> ##  给dep.age 赋值时，setter 就会监听到，自动执行收集到的依赖，也就是收集到的回调函数，赋值操作就自动执行了一遍，依赖了dep.age 的变量b的值也就自动更新了


 ### 上面执行  effectWatch（）时，里面的回调函数会自动执行，会打印b 的值25 

 ### 我们再 执行dep.age=15时，这时候 会发现b的值自动更新，打印30 ，



> # 总结

响应式 就在把引用操作封装到函数里，  通过getter 监听 是否有引用操作，有就把封装了引用操作的函数收集起来，
通过setter 监听是否有新值，有就把收集的函数执行一遍，引用操作就重新执行了一遍，值就更新了。


   
 



