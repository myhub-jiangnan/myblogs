

# vue 生命周期




## 生命周期

> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

## 生命周期函数
> 在不同的阶段，会自动执行相应的函数，我们把这些特定的函数称为生命周期函数，在这些函数中，添加自己的代码，可以让我们在不同的阶段，执行自己想要的任务；



## 主要有8个生命周期函数，执行这8个函数的时候，vue 做了哪些事情呢？

```
  new Vue({
      el:"#app",
      data(){
          return{
              msg:"hello"
          }
      }
  })
```



### 1.beforeCreate: 完成了数据的初始化，但是仍然拿不到data中的数据

```
 
beforeCreate(){
  console.log(this.msg)  // undefined
}

```



### 2.created函数:  实例创建完成，完成了数据的响应式，但是挂载阶段还没完成（即$el 属性不可见）时调用， 这一阶段已完成数据观测，属性和方法的运算， watch/event事件回调；

(如果需要进行前后端的数据交互，需要在当前生命周期中使用，因为这个阶段vue实例还没有挂载完成，从服务器拿到数据后，直接添加到data中，等到挂载完成时，可以用最新的数据，否则挂载完成后又要重新渲染；)


### 3. beforeMount: 创建虚拟DOM，页面中的元素还没真正替换过来

### 4.mounted函数：完成了vue实例的挂载，即用虚拟DOM 替换了绑定的一个DOM 元素，并且完成渲染；
     （el 提供一个DOM元素作为vue实例挂载目标，挂载完成后，可以通过vm.$el 访问该元素）
 
注意： mounted 不会承诺所有的子组件也都一起被挂载。如果希望整个视图都渲染完成，可以用vm.$nextTick() 替换掉mounted;


### 5.beforeUpdate： data 数据发生了更新，就会执行beforeUpdate函数，会重新渲染一个虚拟DOM，页面数据还没更新，

### 6.update： data数据更新，虚拟DOM 替换了绑定的DOM 元素，页面数据也更新了


### 7.beforeUnmount(vue2是 beforeDestroy)：

### 8.unmounted(vue2 是Destroyed)



### 注意

不要在选项 property 或回调上使用箭头函数

