
## this 是什么 ？


**this 是函数在被调用执行时才在该函数内部自动生成的一个引用，这个引用指向调用该函数的对象。**

所以this有两个重要特征：**动态生成**和**动态绑定**；这是this 使用容易造成混乱的根源。

**在方法调用中，this会指向对应的对象。在函数调用中，this就会被绑定到全局对象上。**



 
 ## 应用场景

如果相似的对象都有相似的方法，则将所有的方法挂载到同一个共享原型对象上比把它们在每个对象上挂载一遍更节约内存空间。

**那么原型上的函数如何知道自己在执行的时候，是作用于哪个对象呢？这就要用到this 了。**



调用一个对象的方法的时候，JavaScript会在对应的对象及其**原型链**上搜索对应的方法名。若存在，就直接用，不需要关心是从哪个原型对象上获取的。


```javascript

   let person = {
            name: "jack",
            say() {
                console.log("我是原型对象");
                console.log(this);
                function inner_say() {
                    console.log("say的内部函数");
                    console.log(this);
                }
                inner_say()
            }
    }


    let p = Object.create(person)
        p.age = 20;
    p.write = function () {
            console.log("我是实例对象");
            console.log(this);
    }
    
    p.say()
    person.say()

```

p继承于person 对象，所以person 对象为p对象的原型对象；



##  箭头函数中的this 

箭头函数中使用this有些特别，调用箭头函数时，不生成自己的this, 而是根据外层作用域来决定this 的指向； 它会向外层一层一层的查找，直到最近的外层作用域中，有this 定义的地方，指向相同的对象；



## this 的指向
因为this 的原因JavaScript有4种调用模式
 **<font color='#42B983' size=4.5 > </font>** 

 + 方法调用模式

 + 函数调用模式

 + 构造函数调用模式

 + apply 调用模式(相似的方法还有call(),bind())

  apply()可以改变当前方法或者函数this引用的指向,接收两个参数，传入的第一个参数就是要指向的对象；

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

 ###  **<font color='#42B983' size=4.5 >补充 </font>** 

 改变函数this指向的方法有 **<font size=4.5>apply(),call(),bind()</font>** 

 apply() 与 call() 传第二个参数形式不同，apply()是用数组的形式，call()用逗号隔开就行；

 call()和bind()传参形式一样。 但是bind() 是返回一个新的函数;
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
  let fun= person.fullName.bind(person1); 

  fun()    // 将返回 "Bill Gates"

 ```
                       






