
## this 是什么 ？

this  无非就是函数调用时，被绑定的一个对象。 我们只需要知道this在不同场景下的绑定规则即可；

##  this 是怎么来的？

函数被调用时，会生成一个执行上下文， 这个执行上下文里保存中函数的参数，函数的调用栈，函数的调用方式等，this 也只是其中的一个属性。 所以this 是在函数调用，自动生成的一个对象；

##  箭头函数中的this 

箭头函数中使用this有些特别，调用箭头函数时，不生成自己的this, 而是根据外层作用域来决定this 的指向； 它会向外层一层一层的查找，直到最近的外层作用域中，有this 定义的地方，指向相同的对象；


> 1. 是什么 ?(what) : 

 this 是函数运行时自动生成的一个内部对象.  (关键字: 函数 , 运行 ,对象 ,执行环境.)  既然是运行时生成, 所以this 的指向不是在创建时决定,而是由执行环境所决定.
 
> 2. 具体的指向: 

    1. 全局环境下: 指向window 对象,  在setTimeout 或 setInterval 这样的延

    2. 对象环境中:  指向该对象.

    3.  构造函数环境:  该构造函数的 实例对象.

    4. 事件对象:  在DOM 事件中使用this , this指向触发事件的DOM 元素本身       
          eg:     button.onclick = function(){
                console.log(this.innerHTML);  
                        }
    5.  回调函数中的this 也是指向window;

    6. 箭头函数中的this ;
     箭头函数没有自己的 this，当在内部使用了 this时，它会指向最近一层作用域内的 this ;


> 3.   改变this  指向的方法:

       1.  使用局部变量代替this 指针 ; eg: let _this = this  ;

       2.  call() , apply() ,bind() ;

    ```javascript

      eg:  var  xm= {
         name: “小明”，
        age:20,
       say: function(){
           document.write("我是"+this.name+"今年"+this.age+"岁"+“在”+);
     } 

  var  xh={
       name:"小红"，
         age:18
}            //  xh  没有say方法；

xm.say();
如果xh 想用say 方法， 显示小红的信息，这时候就要改变this的指向；
xm.say.call(xh);
xm.say.apply(xh);
xm.say.bind(xh)();   // bind 方法返回的是一个函数，后面加 （）自执行；

如果 say方法有参数，则可以利用后续参数传参；
  eg:  var  xm= {
         name: “小明”，
        age:20,
       say: function(school,grade){
           document.write("我是"+this.name+"今年"+this.age+"岁"+“在”+school+“上”+grade);
} 
}

xm.say.call(xh,"上海中学"，“初三”）；
xm.say.apply(xh,[ 上海中学"，“初三”]); //  apply 传参 得用数组传参
xm.say.bind(xh, "上海中学"，“初三”)() ;或 xm.say.bind(xh)( "上海中学"，“初三”) ;


 ```   


                       






