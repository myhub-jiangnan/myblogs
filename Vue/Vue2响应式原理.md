# vue 响应式原理

vue 的响应式指的是，当修改了某个数据，所有引用了这个数据的组件都会自动更新视图。概括来说，就是数据驱动视图的自动更新。

为了实现响应式，要解决两个问题：

#### 1. 数据什么时候变了;(数据劫持)

Vue 中通过 Observe 这个类实现了数据的劫持，核心是用 Object.defineProperty() 这个 API,再利用循环和递归，给对象的所有的属性设置 getter 和 setter, 这样数据的读取和修改操作都能监测到。

对数组的劫持则是通过重写了 7 个数组方法。

#### 2. 组件哪些地方用到了数据;(模板解析)

vue 对模板字符串进行解析， 模板字符串 => ast => render 字符串 => render 函数 => vnode =>真实 DOM , 在 render 字符串变成 render 函数的过程中，
用到 with()方法，使 render 函数中的变量指向的就是 vm 实例上的属性。这样模板中引用了哪些数据都能被检测到。

## 解决了上面两个大方向上的问题，如何整合起来实现响应式？要用到下面 4 个类:

#### Observer 类

通过 Observe 实现数据的劫持。给所有的属性添加 getter 和 setter ,这样读取和修改时都能被监测到

#### Watcher 类

一个组件对应一个 Watcher 实例， 该实例对象上有一个 封装了组件重新渲染的操作 的方法。

通过 watcher 实例，渲染更新对应的组件。

每次通过生成一个 watcher 实例，调用实例中的方法实现渲染， 同时把这个 watcher 实例放在全局中。

vm.\_update(vm.\_render()

一个页面中有多个组件，只有其中一个组件数据更新了，就可以做到数据的局部更新。

#### Dep 类

一个属性，对应一个 Dep 实例。 属性被引用时，通过对应的 dep，收集对应的 watcher。 这样改属性修改时，就可以让对应的组件执行重新渲染操作。

没有被引用的属性，就不会触发 getter ,对应的 dep 就收集不到 watcher,。这样修改的时候，触发了 setter, 但是 dep 上没有 watcher,因此并不会更新视图。

实现依赖收集： 利用观察者模式，实现依赖收集。

```
   // 伪代码
   /1. 在进行数据劫持的时候，给每个属性创建一个对应的 Dep 实例。
   let dep = new Dep(); // 每个属性都对应一个dep，用来收集引用了该属性的组件，即watcher

  //2.如果该属性在组件中被引用了，渲染组件的时候会触发 getter()，在 getter 中调用 dep 的一个方法。
   get(){
         dep.depend(); //进行依赖收集
   }

  //3. depend 方法中 调用了当前 watcher 的addDep() 并且传入当前dep
   dep.depend = function(){
      Dep.target.addDep(this) // this是当前dep , Dep.target 就是全局上存放当前watcher 的变量。
   }

  // 4. watcher 实例中的addDep()

  watcher.addDep = function(){
   this.deps.push(dep); // 在watcher 中收集dep
   dep.addWatcher(this); // 在dep 中收集watcher
  }

```

#### 通过上面的代码，就完成了依赖的收集。

1 个 属性对应 1 个 dep;

1 个组件对应 1 个 watcher;

如果 1 个属性被多个组件引用了，该 dep 中就会存放多个 watcher；

该属性被修改触发 setter 时，就通过该 dep 上的方法，让 dep 中的 所有 watcher 执行渲染操作，所以所有引用了该属性的组件都会更新。

如果 1 个组件引用了多个属性，该 watcher 中，就会存放多个 dep。这样组件中引用了哪些属性，就会被记录到。

没有被引用的属性，就不会触发 getter ,对应的 dep 就收集不到 watcher,。这样修改的时候，触发了 setter, 但是 dep 上没有 watcher,因此并不会更新视图。

#### Schedule

被引用的属性，每修改一次，就会触发一次setter,就会执行渲染更新操作，这样性能消耗太大。于是利用 Schedule 实现组件的异步更新，让修改操作都执行完了，再执行渲染更新视图操作。

#### 概念补充：

1.watcher：封装了组件重新渲染操作(vm.\_update(vm.\_render()) 的对象。

2. 一个组件只有一个 watcher 实例。每个组件会 new Watcher() 一个 watcher 实例

   一个组件中有 n 个属性， n 个属性就有 n 个 dep ， n 个 dep 对应一个 watcher

   一个属性可以对应多个组件， 1 个 dep 对应多个 watcher ,所以 dep 和 watcher 是多对多的关系

3.依赖收集： 即哪些属性被组件引用了,把这些属性作一个标记，就是所谓的依赖收集。同一个属性在同一个组件中被多次引用，要避免重复收集。

4. 初次渲染组件，会实例化一个渲染 watcher ，我们可以把当前这个 watcher 放到 Dep.target 上，Dep.target 初始值为 null

## new Vue() 后的会执行的任务流程

1.new Vue() => 合并选项=> beforeCreate() => data 中的属性代理到 vm=> 对 data 进行数据劫持，给每个属性，添加 getter 和 setter,同时实例化一个 dep,由于闭包，这个 dep 不会销毁 => created ()

2.模板编译： 模板字符串 => ast => render 字符串 => render 函数=>new Watcher() => 将当前 watcher 添加到 dep => vm.\_updata(vm.\_render())
