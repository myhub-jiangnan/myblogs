# Vue2 中是如何重写数组的

#### vue2 为什么要重写数组？

Vue2 使用了 Object.defineProperty () 方法来实现数据的响应式，而这个方法只能监听对象属性的变化，如果是数组，我们通过数组下标修改数组时，仍然可以监听到数组的变化，
但是修改数组除了通过下标，还有是直接通过数组的一些方法直接修改数组，那么这种情况就无法监听数组的变化。

因此，对可以直接修改原数组的方法，我们需要重写这些数组方法来实现对数组的监听，从而实现数组的响应式。

并且，如果通过 Oject.defineProperty()监听数组，会给数组的每一项都添加上 getter 和 setter, 而用户通过下标修改数组的情况很少，为此消耗的性能与用户体验不成正比，因此 vue2 对数组的监听是通过重写数组，并没有用 Oject.defineProperty()进行监听。

#### vue2 为什么只重写了 7 个数组方法?

因为只有 push(),pop(),shift(),unshift(),splice(),sort(),reverse() 这 7 个数组方法修改了原数组，所以需要更新视图，因此需要对这 7 个数组方法设置成响应式。

#### 重写数组的原理

实现原理就是改变了数组的原型对象，这个新的原型对象上有 push,pop 等 7 个方法，当调用这 7 个方法时，不仅能实现这些方法的原有功能，还在此基础上添加了更新视图的操作，这样就实现了对数组的监听和响应式。

Oject.create() 以传入的对象 为原型对象

```
   // 1.   创建一个空的新对象
    let newArrayProto = Object.create(Array.prototype)
  // 2. 在新对象上添加 push 方法
   newArrayProto.push = function(...args){

   Array.prototyp.push.call(this,..args) // 实现push的原有功能
   console.log("视图该更新了") // 添加通知视图更新的操作

  }
  // 3. 让数组arr 的原型对象指向 新对象
  
   arr.__proto__ = newArrayProto

```

以上是对 push()的重写，以此类推，其他方法这是这么重写的。
