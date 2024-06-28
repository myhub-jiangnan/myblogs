## this 是什么 ？

**this 是函数在被调用执行时才在该函数内部自动生成的一个引用，这个引用指向调用该函数的对象。**

所以 this 有两个重要特征：**动态生成**和**动态绑定**；这是 this 使用容易造成混乱的根源。

**在方法调用中，this 会指向对应的对象。在函数调用中，this 就会被绑定到全局对象上。**

## 应用场景

如果相似的对象都有相似的方法，我们可以通过构造函数来创建多个实例对象。而构造函数在初始化对象的属性时，就可以很方便的通过 this 来指向
这些实例对象，给这些实例对象设置属性以及方法。

## 箭头函数中的 this

箭头函数中使用 this 有些特别，普通函数是在调用该函数时，自动生成一个 this,这个 this 指向的是调用该函数的对象，而调用箭头函数是在定义箭头函数时就确定了指向，它指向的是定义箭头函数的上下文；并且它会向外层一层一层的查找，直到最近的外层作用域中，有 this 定义的地方，指向相同的对象；

补充： 箭头函没有自己的 this 和 arguments 对象(调用函数时自动生成的一个用来储存函数参数的数组)。并且没有原型对象属性（prototype）。

而箭头函数之所以不能作为构造函数，就是因为没有 prototye 属性。 因为构造函数通过 new 关键字调用，这时候 new 关键字做了一些工作，比如自动创建一个临时对象，并且将这个临时对象的__proto__自动绑定到构造函数的原型对象上。而箭头函数没有原型对象。所以不能作为构造函数

## this 的指向

因为 this 的原因 JavaScript 有 4 种调用模式
**<font color='#42B983' size=4.5 > </font>**

- 方法调用模式

- 函数调用模式

- 构造函数调用模式

- apply 调用模式(相似的方法还有 call(),bind())

apply()可以改变当前方法或者函数 this 引用的指向,接收两个参数，传入的第一个参数就是要指向的对象；

**<font color='#42B983' size=4.5 >形象的解释就是: 一个对象的方法可以借给别的对象用，要借给谁，就传入谁。 </font>**

```
  let person = {
   fullName: function() {
       return this.firstName + " " + this.lastName;
   }
}
  let person1 = {
   firstName: "Bill",
   lastName: "Gates",
}
  person.fullName.apply(person1);  // 将返回 "Bill Gates"

  // person对象将自己的fullName()方法借给person1 用

```

### **<font color='#42B983' size=4.5 >补充 </font>**

改变函数 this 指向的方法有 **<font size=4.5>apply(),call(),bind()</font>**

apply() 与 call() 传第二个参数形式不同，apply()是用数组的形式，call()用逗号隔开就行；

call()和 bind()传参形式一样。 但是 bind() 是返回一个新的函数;
