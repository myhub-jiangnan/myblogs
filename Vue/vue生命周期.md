

# vue 生命周期




## 生命周期

> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

## 生命周期函数
> 在不同的阶段，会自动执行相应的函数，我们把这些特定的函数称为生命周期函数，在这些函数中，添加自己的代码，可以让我们在不同的阶段，执行自己想要的任务；


1. beforeCreate()

 初始化事件和生命周期函数后，开始调用beforeCreate() 函数
 
2. created()

  完成了数据监测和数据代理后，开始调用created()
  可以通过vue 实例访问data中的数据和配置的methods中的方法
  
3.  beforeMounted()
    
    vue 解析模板，生成虚拟DOM， 页面还不能显示解析好的内容。
    完成到这一步后，就会调用beforeMounted()

4. mounted()
    
    vue 将内存中的虚拟DOM，转为真实DOM插入页面后，页面呈现的是经过Vue编译的DOM。
    至此,初始化过程结束。
    完成这一步后，就会调用mounted()。
    一般在mounted中适合进行 发送网络请求、开启定时器、订阅消息等初始化操作。

5. beforeUpdate()

    数据更新了，但页面还没有更新。到这一阶段后，会调用beforeUpdate()
    
6. updated()

   数据是新的，页面也更新了。即新的虚拟DOM 与旧的虚拟DOM 完成了替换。最终完了页面的更新。完成了这一阶段后，调用updated()
   
7. beforeDestoryed()

8. destory()

