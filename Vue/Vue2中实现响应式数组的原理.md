# Vue2中是如何重写数组的



#### vue2 为什么要重写数组？

 Vue2 使用了 Object.defineProperty () 方法来实现数据的响应式，而这个方法只能监听对象属性的变化，如果是数组，我们通过数组下标修改数组时，仍然可以监听到数组的变化，
 但是修改数组除了通过下标，还有是直接通过数组的一些方法直接修改数组，那么这种情况就无法监听数组的变化。

 因此，对可以直接修改原数组的方法，我们需要重写这些数组方法来实现对数组的监听，从而实现数组的响应式。

#### vue2为什么只重写了7个数组方法?

因为只有 push(),pop(),shift(),unshift(),splice(),sort(),reverse() 这7个数组方法修改了原数组，所以需要更新视图，因此需要对这7个数组方法设置成响应式。



#### 重写数组的原理

  Oject.create() 以传入的对象 为原型对象

 prototype 函数的prototype属性指向函数的原型对象

  __proto__ 对象的—__proto__属性指向对象的构造函数的原型对象

```
      let newArrayProto = Object.create(Array.prototype)
      let methods = ["push", "pop", "unshift", "shift", "splice", "sort", "reverse"];

     methods.forEach((item) => {

      newArrayProto[item] = function (...args) {
     let result = Array.prototype[item].call(this, ...args);

    // 同时可以添加页面渲染操作，这样调用这些方法就被监测到了

    //push() unshift() splice() 会给数组新增内容
    // 对新增的内容也要添加getter 和setter
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2);
        break;
    }
    let ob = this.__ob__;
    if (inserted) {
       ob.observeArray(inserted); // 对添加的内容添加getter 和setter
    }
    return result;
  };
});

```

以上是对push()的重写，以此类推，其他方法这是这么重写的。将数组的原型指向一个空对象，该对象的原型上有数组的所有方法。再在该对象上添加push() 方法，这个push方法的效果，
和数组中push()的效果一样。