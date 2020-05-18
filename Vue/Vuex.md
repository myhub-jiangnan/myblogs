
### Vuex的作用：

 是vue 提供的一个公共状态管理插件，把一些组件共享的数据都放入一个对象。直接通过这个对象取到这些共享的数据，避免了组件之间通信需要层层传递的情况；



## 使用步骤：

### 1. npm install vuex

### 2. 单独创建一个store文件夹，index.js 文件

```javascript
     import Vue from 'vue'
     import Vuex from 'vuex'
      // 安装插件
     Vue.use(Vuex)

    // 创建实例对象  注意：  Store 一定要大写，否则会报错
    
    const  store  = new Vuex.Store({
        state:{
            appName:"vuex"
        },
        //1. mutation类似于事件 是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数,
        //2. 不能直接调用 需要通过this.$store.commit('changeData',额外的参数)
        // 3. 必须是同步函数
        mutation:{
            changeData(state){
              state.appName = "Vue"
            }

        },
        // 1. action类似于mutation ,而不是直接更改状态
        //2.  action 可以包含任意异步操作
        actions:{

        },
        // 1. getter 类似于计算属性computed 
        getters:{
           
        },
        modules:{

        }
     })
```    

### 3. 项目入口文件main.js 中挂载vuex 

```javascript

    import Vue from 'vue'
    import App from './App.vue'
    import store from './store'
    Vue.config.productionTip = false
    new Vue({
        // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
      render: h => h(App),
    }).$mount('#app')

```

### 4. 组件中使用state中的数据

```javascript

    <div>{{$store.state.appName}}</div>
    <button @click="changeName"></button>

    new Vue({
        data(){
            return {

            }
        },
        methods:{
            changeName(){
                //  提交 mutation 中的changeData
                this.$store.commit("changeData")
            }
        }
    })
```
