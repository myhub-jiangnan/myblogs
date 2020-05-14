
## 内存

### 堆内存用来存储引用类型的数据，创建一个堆内存空间，都会有一个16进制的内存地址； 比如return 一个函数，其实是返回一个16进制的内存地址；

### 栈内存用来存储基本数据类型 ，同时也是执行代码的环境,因为函数一执行，就会创建一个执行上下文环境，执行上下文环境会被压入栈内存，也叫执行栈；

### 经典面试题

```javascript
    let a= {},
        b= "0",
        c= 0;
    a[b] = "hello"
    a[c] = "JavaScript"
    console.log(a[b])  //  打印的是 JavaScript ； 原理： 属性名不能重复

    // 
      let a= {},
        b= Symbol("0"),
        c= Symbol("0");
    a[b] = "hello"
    a[c] = "JavaScript"
    console.log(a[b])  //  打印的是 hello ； 原理: symbol 创建的是唯一值； Symbol("1") === Symbol("1")   false 

```

## 深浅克隆

### 浅克隆 只克隆一层，。比如 obj1对象，有多层，obj2 是克隆对象obj1 得来的，obj2拿到的是obj1 中值的内存地址， 这样我们操作obj2 会影响到obj1,把obj1的值也改变了；

```javascript
 let obj1 = {
     a: 100,
     b:[1,2,3,4,5],
     c： {
         name:"jack",
         age: 50
     }
 }
 // 利用es6 的语法进行浅克隆
 let obj2 = {
     ...obj1
 }
 obj1 中的b,c 属性值都是引用类型，放入了堆内存；打个比方，b的内存地址为AAAFFF001,c 的内存地址为AAAFFF002 ;
 obj1.b 和obj2.b 都是指向内存地址为AAAFFF001 的那个堆内存空间。




 
```
