
#Vuex的作用：

 是vue 提供的一个公共状态管理插件，把多个组件共享的数据都放入一个对象。直接通过这个对象取到这些共享的数据，避免了组件之间通信需要层层传递的情况；



# 使用步骤：

## 安装：

 1. npm install vuex  (vue2 中得安装vuex@3, vue3中安装vue@4)

## 注册插件：

  在使用store 实例前，必须先注册vuex插件， 所以，我们把注册Vuex代码写在store 文件里


```javascript
    import Vue from 'vue'
    import store from './store'
    new Vue({
    store,
      render: h => h(App),
    }).$mount('#app')

```


## 创建store实例

```javascript
        // store.js
   import Vue from "vue"
  import Vuex from "vuex"
   Vue.use(Vuex)   // 注意： 在创建vuex 实例前，必须得先注册vuex插件


// store.js 文件
    const  store  = new Vuex.Store({
        // 放共享数据的地方
        state:{
            appName:"Vue"
        },
        //如果有异步操作,则必须放到actions 里操作。同步任务的话，则不必写在actions里，直接放mutations里就行
        actions:{
            changeData(context,value){ //1.上下文对象；2.组件传过来的参数 
             context.commit("ChangeData",vlaue)
            }
        },
        //1.必须是同步任务的操作
        //2. mutation是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数,
        mutation:{
            ChangeData(state,vlaue){ // mutations 里的方法一般都大写
              state.appName = "Vuex"
            }
        },

        // 作用跟 computed 很类似
        getters: {
            bigName(state){ // 接收state 作为参数,注意必须写返回值
            return state.appName.toUpperCase()  // 组件中使用： $store.getters.bigName
            }
        }
      
       
     })
```    


## 组件中使用state中的共享数据

```javascript

    <div>{{$store.state.appName}}</div>
    <button @click="changeData"></button>

    exprot default {
        data(){
            return {
                newName:"vuex"
            }
        },
        methods:{
            changeData(){
                // 调用actions 中的方法：this.$store.dispatch
                this.$store.dispatch("changeData", this.newName)

                //直接调用mutations中的方法： this.$store.commit
                this.$store.commit("ChangeData", this.newName)
            }
        }
    }
  
```


## mapState

> mapState方法的作用： 帮我们把映射state中的数据为组件中的计算属性

 如上图所示，在组件的html中使用共享数据，得 $store.state.propsName, 这样比较麻烦，所以我们

 可以把propsName写成 计算属性

 ```
    computed(){
        appName(){
            return this.$store.state.appName
        },
       
    }

 ```
 经过上面代码的改进后，html 中只需要 {{appName}},但是如果要用到很多数据，那么computed中，我们还是要写大量appName计算属性这样的重复代码

 这时候就可以用到vuex 提供的mapState

 ```
  import {mapState} from "vuex"  // 引入mapState
    computed(){
        ...mapState(["appName","appName2","appName3"}])  // 对象解构

    },
  
 ```

 ### mapState 做了什么工作?

   数组写法
 ```
        const x = mapState(["appName","appName2","appName3"]) // 可以同时映射多个，加在数组里就行
        console.log(x)  // 打印发现x 是一个对象
        //mapState()返回了一个对象，做了如下工作
        {
            appName:function(){
                return this.$store.state.appName
            },
            ...
        }

 ```

对象写法
 ```
    const x = mapState({appName:"appName",appName2:"appName2"})

    注意不能写成如下
      const x = mapState({appName,appName2})
    上面写法相当于
     const x = mapState({appName:appName,appName2:appName2})
     
    但是我们并没有变量appName, 我们要传的是字符串，并不是变量

 ```



 ## mapGetters

 mapGetters 方法的作用就是帮我们映射getters中的数据为计算属性

 ```
    import {mapGetters} from "vuex"
 ```

引入mapGetters后，用法跟写法和mapState 一样。


## mapActions

作用： 借助mapActions 生成对应的方法，方法会调用dispatch 去联系actions

methods:{

  changeData(n){
        this.$store.dispatch("changeData",this.newName)
   }
}

```

借助mapActions

```
 import {借助mapActions}  from "vuex"
 
 methods:{

        //数组写法  这种写法就组件中的事件名得和actions中的方法同名 ,建议用数组写法（mapMutations中建议用对象写法，因为mutations中的方法一般大写）
    ...借助mapActions(["changeData"])        

        //对象写法  传入组件中的方法，和mutations中对应的方法，可以不同名
    ...借助mapActions({changeData:"changeData"}) // 但是注意，这里没法儿传参，得在html 中传
 }

 <button @click="changeData(newName)"></button>   //  参数在这里传


## mapMutations

作用：借助mapMutations 生成对应的方法，方法中会调用commit 去联系mutations


用法和mapActions 一样， 只是推荐用对象写法，因为组件中方法名一般小写，而mutations中方法名一般大写。 名字不一致，没法儿用数组写法。


## vuex 模块化编码

vuex 模块化编码的核心是利用 命名空间namespace

如果不用模块化，多人合作开发的时候， 容易造成命名冲突，

```
  // 学生相关的数据以及处理方法
 const  studentsOptions = {
    namespaced:true, // 开启命名空间
    states:{
        studensName:"jack"
    },
    acitons:{
        say(){

        }
    },
    mutations:{},
    getters:{}
 },

 // 学校相关的配置
 const schoolOptions = {
    namespaced:true, // 开启命名空间
     states:{},
    acitons:{},
    mutations:{},
    getters:{}
 }

  export default new Vuex.Store({

    modules:{
        studentsOptions,  
        schoolOptions
    }
  })

```

### 组件中

```
       // 第一个参数是命名空间的名称, 第二个参数是 取对应数据的数组写法
    ...mapState("studentsOptions",["sutdentName"])
    ...mapActions(studentsOptions,["say"])

```



