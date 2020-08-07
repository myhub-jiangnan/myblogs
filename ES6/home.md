# 数组扩展

 ## 扩展运算符

+ 扩展运算符 用三个点(...)表示，将数组转化成用逗号分开的一个参数序列,即一下子把所有的元素取出来 ，用逗号分开
```javascript

   let arr = [1,2,3,4,5]
   console.log(arr)  // [1,2,3,4,5]
   console.log(...arr) // 1,2,3,4,5

```
----

## keys() 

遍历数组中的key值 ，返回一个 “遍历器对象”

----

## values()



 



# Set 结构数据

+ 类似数组，没有重复的元素。每个元素都是一个键值对

```javascript
    //通过Set构造函数创建set类型实例
   let set =  new Set()

   // add()方法添加元素
   set.add(1)

    // 将set 结构转为数组
   Array.from(set)


   // 遍历set 
    let set = new Set([1,2,3,4,5])

    set.forEach((key,value)=>{
        console.log(key+":"+ value)  // 1: 1 ;2:2 ; 3:3 .....
    })


   // size()返回有多少个元素
   set.size() // 1

   // 判断是否有某个元素
   set.has(value)


   // 删除某个元素，返回一个布尔值
   set.delete(value) 


```
----
## Map 结构数据

+ Map 结构的数据，是一个键值对的集合。 传统的键值对，键都是字符串。Map结构的数据，键可以是任意类型的值；

```javascript
  
    let map = new Map()

    map.set("name","jack")
    map.set(undefined,"rose")  // 键可以是undefied
  
```