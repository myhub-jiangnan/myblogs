

## Object.defineProperty(obj,prop,descriptor)

obj: 要定义属性的对象；

prop: 要定义或修改的属性名;

descriptor: 属性描述符;

属性描述符分两大类： 数据属性和访问器属性（存取器属性）

1. 对象属性的作用就是用来存储数据；

2. 既然有数据存储，就会有数据的增删改查操作（增加属性，修改属性值，获取属性值，删除属性）

3. 属性描述符中的数据属性用于控制属性的增删改查操作特征;

4. 访问器属性用于监听属性的存储过程;


> 数据属性中的value 和writable 和访问器属性不能同时存在



## 数据属性
```
 let person = {}
Object.defineProperty(person,"name",{
  configurable:false,  // 为true时 该属性就能被删除
  enumerable:false,// 为true时 可枚举
  value:undefined, // 该属性的值，默认为undefined
  writable:false,  // 为true 时属性值才能被赋值运算符改变

})

```

## 访问器属性

```
  let p= {}
  let person = {
    name:"peter"
  }
 Object.defineProperty(p,"name",{
     // 注意 get里取name 要用下划线，否则报错
     get(){
        return person.name
     },
     set(newVal){
          person.name= newVal
     }
 })

 总结： 对p 对象进行数据劫持，可以监视到p 对象属性的读取和修改操作。

 缺点： 不能检测到对象属性的 添加和删除操作。        

```
>  有get 方法没有set 方法，该属性就只能取值不能赋值；

对象取值时会调用get方法，取到的值为get方法返回的值，默认为undefined,

对象赋值时会调用set方法

>  person.name = "jack" 相当于执行了 set("jack")










