

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
 let person = {}

 Object.defineProperty(person,"name",{
     // 注意 get里取name 要用下划线，否则报错
     get(){
         return person._name
     },
     set(val){
         person._name = val
     }
 })

```
>  有get 方法没有set 方法，该属性就只能取值不能赋值；

对象取值时会调用get方法，取到的值为get方法返回的值，默认为undefined,

对象赋值时会调用set方法

>  person.name = "jack" 相当于执行了 set("jack")



## vue  源码



> 数据监测

### 1. vue 中的observer类会通过递归的方法，把一个对象的所有属性转化成观测对象,这就是所谓的数据劫持；

### 2. 视图层中谁用到了这个数据，就是所谓的谁依赖了这个数据，我们给每个数据建立一个依赖数组，谁依赖了这个数据，就把谁放入这个数据的依赖数组中；当这个数据发生变化时，就去对应的依赖数组中，把每个依赖通知一遍。这个过程就是所谓的依赖收集。这样可以高效精准的更新视图层。

### 3.当某个数据被调用时,就会触发getter,赋值时就会调用setter, 因此我们可以在getter中收集依赖，在setter中通知依赖；

### 4. 仅仅用数组来管理依赖功能过于欠缺，我们应该将依赖数组的功能扩展一下。vue 的做法是创建一个依赖管理器，也就是Dep 类，这个类中不仅有存放依赖的数组，还有对依赖进行添加，删除，通知等操作的方法；

### 5. 有了依赖管理器后，我们就可以在getter中收集依赖，在setter中通知依赖更新

### 6. "谁用到了这个数据谁就是依赖"，反应在代码上，这个"谁"就是watcher类的实例。当数据发生变化时，不去直接通知这个依赖，而是这个依赖对应的watcher实例，再由watcher实例去通知真正的视图。所以依赖数组中放的是watcher 实例

### 7. Watcher类的构造函数中，在get()方法中，我们通过 window.target = this 把实例自身赋给了全局的一个唯一对象window.target上；
    通过 let value = this.getter.call(vm,vm) 获取被依赖的数据， 这样就触发了 该数据上的getter(),而getter()里会调用dep.depend()收集依赖，


> 虚拟DOM 

### 1. 所谓虚拟DOM 就是用一个JS 对象来描述一个DOM 节点

```
 <div id="a" class="b">我是内容</div>


{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}


```

我们把这个JS 对象称为是真实DOM节点的虚拟DOM节点。

### 2. 为什么要有虚拟DOM

VUE 是数据驱动视图的，当数据发生变化时就要随之更新视图，要更新视图就要操作DOM, 而操作DOM 是非常耗费性能的，因为浏览器的标准就把DOM 设计的非常复杂。

因此我们可以用js的计算性能来换取操作DOM 消耗的性能.

我们可以用JS模拟出一个DOM节点，称之为虚拟DOM节点。当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过DOM-Diff算法计算出需要更新的地方，然后去更新需要更新的视图。

这样就减少了操作真实DOM,大大提高了性能。

### 3. VNode类

通过这个类 我们可以实例化出不同类型的虚拟DOM 节点


### 4. VNode 虚拟节点

虚拟节点的作用： 在视图渲染前，把写好的template模板先编译成VNode 并缓存起来，等数据发生变化需要重新渲染时，我们把数据变化后生成的VNode 和前面缓存好的
VNode 进行对比，找出差异，有差异的VNode对应的真实DOM 节点就是需要重新渲染的节点。

根据有差异的VNode,创建出真实的DOM，再插入到视图中，最终完成一次视图的更新。

### 5. dom-diff

对比新旧两份VNode 并找出差异的过程就是所谓的dom-diff 过程。 dom-diff 算法是整个虚拟DOM 核心所在.

> 模板编译

### 1. render函数

用户写的<template></template>标签中的类似于原生HTML的内容称之为模板，进行编译就会产生VNode  。

把原生HTML 的内容找出，再把非原生HTML 找出来，经过一系列的处理生成渲染函数，也就是render函数。render函数会将模板内容生成对应的VNode，这一过程称之为模板编译

### 2. 抽象语法树

模板编译过程中借助抽象语法树这一概念， 把模板用一个JS对象来描述。




