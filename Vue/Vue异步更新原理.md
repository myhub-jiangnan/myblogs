# Vue 异步更新原理

每次更新数据，重新渲染，这样性能不好。

修改数据是同步操作， 把重新渲染的操作放在定时器里，变成异步任务。利用防抖的原理，等修改数据的操作执行完了，最后才执行重新渲染的操作。

  ```
    //调用nextTick的方式：全局api
    Vue.nextTick(()=>{
    })
    // 实例上的方法
    this.$nextTick(()=>{
        // 这里才可以获取到更新后的DOM
    })

```


### diff 算法 

在之前的更新中，每次都会生成新的vnode，通过新的vnode 生成真实dom,替换之前的DOM

使用diff 算法后，第一次渲染生成vnode, 第二次更新也会调用 render 函数生成新的vnode,两次对比后，只更新前后不同的那部分内容。

diff 算法是一个平级比对的过程：

1. 同级的两个节点不是同一个节点，直接删除老的换上新的
2. 两个节点是同一个节点(判断节点的tag 和key)，比较两个节点的属性是否有差异 ，复用老的节点更新属性
3. 节点比较完毕之后，就比较两个节点的子节点

vue2中通过双指针的方式比较两个节点 ：

 头指针和尾指针， 只要有一个节点的头指针超过了尾指针，就停止循环，将尾指针的那部分添加或删除

 老节点：oldStartIndex oldEndIndex;
 新节点：   newStartIndex newEndIndex


 交叉比对

 乱序比对

 