
# vue 响应式原理

vue 的响应式指的是，当修改了某个数据，所有引用了这个数据的组件都会自动更新视图。概括来说，就是数据驱动视图的自动更新。


为了实现响应式，要解决两个问题：

#### 1. 数据什么时候变了;(数据劫持)

 Vue中通过Observe 这个类实现了数据的劫持，核心是用Object.defineProperty() 这个API,把传入的对象作为data选项，并把所有的属性转为getter和setter, 这样数据的读取和修改操作都能监测到。

#### 2. 组件哪些地方用到了数据;(模板解析)

vue 对模板字符串进行解析， 模板字符串 => ast => render字符串 => render函数 => vnode =>真实DOM , 在render 字符串变成render函数的过程中，
用到with()方法，使render函数中的变量指向的就是vm 实例上的属性。这样模板中引用了哪些数据都能被检测到。


## 解决了上面两个大方向上的问题，如何整合起来实现响应式？要用到下面4个类: 

#### Observer类

给所有的属性添加getter 和setter ,这样读取和修改时都能被监测到

#### Dep类

实现依赖收集： 每个属性都有一个对应的dep 实例， 如果该属性在模板中被引用了，会触发getter()就会在dep 的一个数组里添加一个watcher，
触发setter(),该属性对应的dep 实例，就会把添加了的watcher 执行。 

#### Watcher

封装了组件重新渲染的操作

vm._update(vm._render()

#### Schedule 

每次修改数据就执行：  vm._updata(vm._render()) 性能消耗太大,利用Schedule实现组件的异步更新



#### 概念补充：

1.watcher：封装了组件重新渲染操作(vm._update(vm._render()) 的对象。

2. 一个组件只有一个 watcher实例。每个组件会 new Watcher() 一个watcher 实例

   一个组件中有n个属性， n个属性就有n个dep ，  n个dep 对应一个watcher 

   一个属性可以对应多个组件， 1个dep 对应多个watcher  ,所以 dep 和watcher 是多对多的关系


3.依赖收集： 即哪些属性被组件引用了,把这些属性作一个标记，就是所谓的依赖收集。同一个属性在同一个组件中被多次引用，要避免重复收集。

4. 初次渲染组件，会实例化一个渲染watcher ，我们可以把当前这个watcher 放到Dep.target 上，Dep.target 初始值为null









## new Vue() 后的会执行的任务流程

1.new Vue() => 合并选项=> beforeCreate() => data中的属性代理到vm=> 对data 进行数据劫持，给每个属性，添加getter和setter,同时实例化一个dep,由于闭包，这个dep 不会销毁 => created ()

2.模板编译： 模板字符串 => ast => render字符串 => render函数=>new Watcher() => 将当前watcher 添加到dep =>  vm._updata(vm._render())




