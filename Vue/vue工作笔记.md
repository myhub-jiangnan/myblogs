






## 25. 虚拟机 

虚拟机，就是在你的操作系统里面，装一个软件，然后通过这个软件，再模拟一台甚至多台“子电脑”出来。
Docker 是一个用于开发，交付和运行应用程序的开放平台。
虚拟机（virtual machine）就是带环境安装的一种解决方案。它可以在一种操作系统里面运行另一种操作系统


## 24. 如何避免if 嵌套过深

  




## 21. JS 值类型和引用类型
    1.值类型放在栈区，访问时按值访问
    ---

    2.delete obj.x  , obj.x 既不是值类型也不是引用类型，是一个表达式，所以delete 这个操作的正式语法设计并不是“删除某个东西”，
    而是“删除一个表达式的结果” 
      delete 0 ,在JavaScript中将0视为一个表达式，并尝试删除它的求值结果；
    ---
    3. 在js 中表达式是一个很独特的东西， 所有表达式的终极目的都是为了得到一个值。 表达式的值，在ECMAScript规范中称为“引用”
    ---
    4. 在js 只有表达式和语句可以被执行并有执行结果。
    ---
    5. x= x 表示的意思是把值x 赋给引用x   //  左手端是引用，右手端是值
    ---
    6. 对象方法调用的来由： 函数调用运算符是（） ，eg： obj.x 对象属性存取运算符".",返回的是关于x的引用（ obj.x 是表达式，表达式的值是引用），如果
        obj.x 只是值，那么它就不能携带obj这个对象；
     --- 
    7. delete x , 当x 是全局对象global的属性时，那么所谓delete x 只需要返回global.x 这个引用就可以了，
    ---
    8. 当delete尝试删除值类型数据时，会返回true, 用于表示没有错误(Error)，本质上什么操作也没做;

        delete 0 的本质是删除一个表达式的值(Result);

        delete x 与上述的区别在于Result 是一个引用(Reference)， 如果x 不存在，也会返回true。这是因为这里的x仍然会得到一个引用，称为UnresolvableReference，
         但是ECMAScript规范约定，如果这里是UnresolvableReference，返回true
        
      延伸扩展：如果访问不存在的变量x报ReferenceError错误，其实是对x表达式的的Result引用做getValue的时候报的错误，然后为啥typeof x和delete x不报错，因为这两个操作没有求值。

        delete 其实只能删除一个引用，即对象成员(Property) , 所以只有delete x  等值于 delete obj.x 时才有执行意义；

        delete undefined 返回false，  而 delete null返回true，  这是因为ECMAScript 规范把undefined 声明成了一个全局属性，并且这个属性是只读的，而null是一个关键字。 delete undefined 是 delete global.undefined 是删除引用，而不是删除值，因此返回false 


        JavaScript关键字(Reserved Words)是指在JavaScript语言中有特定含义，成为语法中一部分的那些字。不能作为变量名和函数名使用，否则会出现编译错误。

        

     





## 4.  路由引入组件  component : ()=> import('@/view/smartsite/myMachines')

         









