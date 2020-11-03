
# Vue 响应式原理

参考文章： 

https://www.cnblogs.com/fundebug/p/responsive-vue.html



> ### 这套响应式系统的作用：

当我们更改data中的属性时，响应式系统会帮我们重新渲染页面，更新视图层；

将data中的属性getter/setters 化，这个过程不可见，在这些属性被访问和修改时将通知变更；
每个组件实例对应一个watcher 实例， watcher 会触发相关联的组件重新渲染；


> ### 实现原理： 

1.监听数据数据的变化 （数据劫持/数据代理）

2. 收集视图层依赖了哪些数据（依赖收集，getter相关的逻辑就是做依赖收集，而Dep是整个依赖收集的核心）

3. 数据变化时，自动“通知”需要更新视图的部分进行更新(发布订阅模式)


> ### 实现这些原理的技术：

1. Object.definePropery 和 Proxy(实现数据劫持)

```
Object.keys(obj) 返回obj 对象属性的字符串数组 

Object.defineProperty(obj, prop, descriptor)
 // 返回被修改后的obj对象;  注意，默认情况下，通过Object.defineProperty()添加的属性值是不可修改的，所以在vue初始化的时候就要在data中先定义某个属性，否则就无法做到响应式

 Object.defineProperty(obj, prop, {
configurable: true,// 为true时该属性才可以被修改和删除
value:   , // 该属性对应的值
get:    , //  该属性的getter函数，当访问该属性时就会调用getter()函数，该函数的返回值会作为该属性的值，默认为undefined
set:    , //  该属性的setter函数，当该属性值被修改时，就会调用setter()函数,在setter 函数里触发render()函数
       就可以重新渲染页面


 })
 
 1.2 Proxy

```

2.1  订阅者Dep 和观察者Watcher( 收集依赖，更新视图)

```
Dep 用来收集依赖，删除依赖和向依赖发送消息等。

Watcher 可以理解成一个中介，数据发生变化时通知它，然后它再通知其他地方

Dep的简单实现

class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }
    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }
    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

以上代码主要做两件事情：

用 addSub 方法可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；

用 notify 方法通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作


```



> ### 简易的数据响应式

```
function observe (obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  function defineReactive (obj, key, value) {
    observe(value)  // 递归子属性
    let dp = new Dep() //新增
    Object.defineProperty(obj, key, {
      enumerable: true, //可枚举（可以遍历）
      configurable: true, //可配置（比如可以删除）
      get: function reactiveGetter () {
        console.log('get', value) // 监听
     // 将 Watcher 添加到订阅
       if (Dep.target) {
         dp.addSub(Dep.target) // 新增
       }
        return value
      },
      set: function reactiveSetter (newVal) {
        observe(newVal) //如果赋值是一个对象，也要递归子属性
        if (newVal !== value) {
          console.log('set', newVal) // 监听
          render()
          value = newVal
     // 执行 watcher 的 update 方法
          dp.notify() //新增
        }
      }
    })
  }
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        console.log('模拟视图渲染');
    }
}
```

> ### 总结

 1. Object.definePropery() 中的getter()和setter() 用来监听数据的访问和修改，把data对象变成响应式对象


 2. Dep类用来提供一个存放Watcher对象的数组，同时还提供向这个数组中添加watcher 对象的方法(收集依赖)，还有通知数组中的所有watcher对象调用更新视图的方法(派发更新视图)

访问某个属性时，自动调用getter()函数，在getter()函数中将watcher添加到订阅Dep ,即收集到了一个依赖，当修改数据时，自动调用setter()函数，在setter()函数中调用render()重新渲染;

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。



到底什么是watcher ?

一个组件对应一个watcher , 

watcher的作用

Dep


数据劫持

Observe中进行数据劫持，在数据被读取时，触发get方法，执行Dep 来收集依赖，也就是收集Watcher。

在数据被修改时，触发set方法，通过对应的所有依赖(watcher)，去执行更新，比如watch 和computed 就执行开发者自定义的回调方法。



通过Object.defineproperty()做好数据的监听，即Object.defineproperty()的参数有会传入一个对象，该对象的属性被读取时，就调用会自动调用get()，当该
属性被修改时，会自动调用set();

当我们用vue特有的指令，引用该对象的属性时，通过编译就能识别出该属性被读取，这时就触发get(), 在get()里我们将这些被引用的属性收集起来，

watcher 原理  https://www.jianshu.com/p/6ceb1691f8ad

每个vue 实例都有一个专属的watcher,    多个watcher 保存在 Dep 类中;

当某个vue 实例的某个属性被引用时，该实例的watcher 就会被放入 Dep 类的 subs 数组中
