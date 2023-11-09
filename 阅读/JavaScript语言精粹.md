 
 # 《JavaScript 语言精粹》 

 
## 1. NaN

 NaN 表示一个数值，一个不能产生正常运算结果的数值。

 NaN 不等于任何值，包括它自己。

 ### 检测NaN类型

 ```
   let a = 100;
   console.log(isNaN(a))  // false
    
 ```
 ### 补充
     
    typeof NaN  // "number" 
    
    数组,null,对象的 typeof 返回字符串 "objcet"

    函数的 typeof 返回字符串 "function"


## 2. 减少全局变量污染

> 不用var 声明全局变量

全局作用域下var 声明的变量，会挂载到window对象上，作为window对象的属性。并且可以**重复声明**；

用let 声明的变量就不会挂载到window对象上，也不可以重复声明。

> 创建一个唯一的全局变量

```
var app = {}
app.name = "app";
app.person ={

}
  
```

> 使用闭包



## 3. 函数对象和this

 ### 函数执行时，函数内会生成两个隐藏的参数：  **<font size=4.5>this 和arguments</font>** 

 >  **<font color='#42B983' size=4.5 >this </font>**  

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

 >  **<font color='#42B983' size=4.5 >arguments </font>** 
 
 函数执行时，参数都会放入arguments 数组中；

 ```
   function add(a,b,c){
       console.log(arguments);
       console.log(a+b+c)
   }

    add(1,2,3)  //打印 [1,2,3]  和 6
 ```
   
  **<font color='#42B983' size=4.5 >事实上，arguments 又不是一个真正的数组，它只是一个类似数组的对象。 </font>**  arguments 拥有一个length 属性，但它没有任何数组的方法。

  > tips

  调用一个函数时，总是会返回一个值，如果没有指定，则返回undefined   

  ```
   // 接上面的代码，add() 没有指定返回值

   console.log(add(1,2,3))  // 打印：[1,2,3] 和6 还有 undefined
    
  ```

  ## 4. 作用域

  作用域控制着变量和参数的可见性以及生命周期。可以减少命名冲突，还提供了自动内存管理。

  还有一个重要好处  **<font color='#42B983' size=4.5 >内部函数可以访问外部函数中的变量和参数 (除了this 和arguments) </font>** 

  ## 5. 闭包
 
   **<font color='#42B983' size=4.5 >函数的作用域: </font>**  
   
   函数的作用域，控制着函数中变量和参数的可见性，即内部函数可以访问外部函数中的变量,而外部函数不能访问内部函数中的变量。控制着变量的有序访问。

   **<font color='#42B983' size=4.5 >JavaScript垃圾回收:</font>**   
  
  JavaScript垃圾回收机制, 又导致当函数执行完函数内部的变量就被自动销毁，函数执行完，函数外就更获取不到这些变量。

   **<font color='#42B983' size=4.5 >问题来了： </font>** 

   **<font size=4.5>如果我们想在函数执行完后，在函数外部还能反复访问这些变量，该如何处理？</font>**  

   **<font size=4.5 >这时候就可以用到闭包。 </font>** 

   <!-- https://blog.csdn.net/weixin_42165445/article/details/100899287 -->

**<font color='#42B983' size=4.5 >仔细观察下面5个例子的区别： </font>** 

   > 通过return 返回函数内部变量

   ```
     function test(){
         let sum=10;
         sum+=1;
         return sum
     }
     console.log(test()) //  11
     console.log(test()) //  11
     console.log(test()) //  11
   ```
上面例子中，每次执行test(),  **<font size=4.5>本质上返回的都是一个新的sum 变量,</font>** 虽然值都是11。

虽然通过return 返回了函数内部的变量, 函数外访问到了这个变量，但是执行完之后，变量sum 就会被销毁，只能操作一次。如果想对sum 做累加操作，就实现不了。

   > 通过return 返回函数内的一个内部函数
   
   即使有函数的嵌套，但是这个内部函数并没有引用外部函数中的变量, 就不会产生闭包(通过打断点的方式，可以在浏览器中查看，此时并没有产生闭包)

   ```
      function test() {
            let sum = 10;
            sum += 1;
            return function () {
                console.log(333)
            }
        }
        console.log(test()()); //333
        
   ```

上面例子的主要意义是想证实 闭包是在什么情况下才产生； **<font color='#42B983' size=4.5 >只有内部函数引用了外部函数中的变量，才产生闭包，这个内部函数就是闭包。这个时候，闭包才拥有外层函数活动对象的引用。 </font>** 



> 通过return 返回函数内的一个内部函数

不同的是，这个内部函数引用了外部函数中的变量，因此返回的是一个闭包。

   ```
     function test() {
            let sum = 10;
            sum += 1;
            return function () {
                return sum;
            }
        }
        console.log(test()()); // 11
        console.log(test()()); // 11
        console.log(test()()); // 11
   ```

   上面的例子主要是用来再次证明闭包的产生条件。通过打断点调试的方式，我们可以看到闭包Closure, 在闭包里sum的值为11

**<font color='#42B983' size=4.5 >为什么上面执行3次打印，输出的都是11? </font>** 

因为上面代码执行了3次test(),所以本质上是创建了 **<font color='#42B983' size=3.5 >3个 </font>**  不同的变量sum, 生成了  **<font color='#42B983' size=3.5 >3个闭包 </font>**  ,闭包里存的变量sum的值都是11。

```
   function test() {
            let sum = 10;
             sum += 1;
            return function () {
                return sum;
            }
        }

    let f = test() ;
    console.log(f())    //11
    console.log(f())    //11
    console.log(f())    //11

```
 **<font color='#42B983' size=4.5 >为什么上面执行3次打印，输出的又都是11? </font>** 

这次与上个例子中的代码不同在于，只执行了一次test(),因此只创建了 **<font color='#42B983' size=3.5 >1个 </font>**  变量sum,  **<font color='#42B983' size=3.5 >1个 </font>** 闭包，并且这个变量 只做了一次加1的操作，就被保存在了闭包里，闭包里执行的只是返回固定值的变量sum。

```
   function test() {
            let sum = 10;
            return function () {
              sum += 1;
                return sum;
            }
        }

    let f = test() ;
    console.log(f())    //11
    console.log(f())    //12
    console.log(f())    //13
```
闭包里保存着外部函数test()中的变量sum, 这个变量sum 不会被销毁，每调用一次闭包，就把sum加1;

 **<font color='#42B983' size=4.5 >从上面的例子中，我们就可以看出闭包的功能： </font>** 

 1. 有了闭包，我们可以将一些数据放在函数内部，这样数据有了私密性，且不会造成全局变量污染。
   
   函数外想访问这些数据的时候，可以通过闭包访问，这样又不影响数据的沟通。

 2. 有了闭包，外部函数中的数据不会被销毁，可以在原来的基础上，反复操作这些数据。  

  ```
      function test(){
          let sum =100;
          return function (a){
              sum+=a
              return sum
          }
      }

      let f = test();
      console.log(f(1))  //  11
      console.log(f(5))  //  16
      console.log(f(10))  //  26

  ``` 

 **<font color='#42B983' size=4.5 >执行f() 传入不同的参数，就可以在原来的基础上对 test()内部的变量sum 反复操作。 </font>** 


 ## 6. 回调函数

  **<font color='#42B983' size=4.5 >定义：</font>** 将一个函数作为参数传给另外一个函数，在主体函数的函数体内再调用这个传入的函数。

   **<font color='#42B983' size=4.5 >作用：</font>** 方便模块儿化编程。将某些操作放在主体函数里，另一些操作封装在回调函数里。需要执行这些操作的时候再调用回调函数就行。

    **<font color='#42B983' size=4.5 >this指向： </font>** 回调函数是作为函数直接调用的，而非是某个对象的方法来调用，所以回调函数内的this 绑定的对象是全局对象window。 

   

 ```  
     let person = {
            play(projectName01,projectName02,fn) {
                console.log(projectName01)
                fn()
                console.log(projectName02)
                console.log(this);
            }
        }

        person.play("看电影","打游戏",function () {
            console.log("喝可乐");
            console.log(this);
        })
    
 ```

 ## 7. 数组

    用delete 删除数组中的某一项，会留下一个空洞

    ```
      let arr = [1,2,3]
      
      delete arr[2]

      console.log(arr)  //  [1,empty,3]
    ```

    tips:

    遍历数组最好用 forEach();

   > for...in  用来遍历对象的特点
   
   1. 是按  **<font size=4.5> 任意顺序</font>** 来迭代对象的属性。用来迭代数组时，可能会导致不是按下标顺序来迭代

   2. 不仅遍历对象上的属性，还会遍历所有从  **<font size=4.5>原型对象上继承来的属性</font>**  
   ```
       let person = {
           name:"jack",
           age:20
       }
       let p = Object.create(person);
       p.weigth = 130

       for(let i in p){
           console.log(i) //  weigth ,name ,age
       }

   ``` 

  > **<font color='#42B983' size=4.5 >for... of </font>** 用来迭代对象(包括数组和对象,arguments)
    
   **<font size=4.5>每次迭代 将属性值分配给对象</font>**  

   ```
     for(let item of arr){
        console.log(item)
     }

    
   ```

  > tips:  判断是否是数组

  Array.isArray(arr)  // true 

  typeof arr  // objcet

  ## 8. 缺少块级作用域的语句

  > if 语句

  ```
    if(true){
        var name = "jack";
    }
    console.log(name)
  ```

  > for, while , do  语句都没有块级作用域

  ## 9. eval()

  eval() 会将传入的字符串当作JavaScript 代码来执行;

  这会带来严重的安全漏洞。

  ## 10.构造器函数和new 运算符

  构造器函数是被设计成 结合new 运算符一起使用。如果调用构造器函数，而忽略使用new运算符， **<font size=4.5>新的对象不会被创建</font>**  , 并且  **<font size=4.5>this会被绑定到全局对象上</font>** 。  





   



 







 

  







































 


