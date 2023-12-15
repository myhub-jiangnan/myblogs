# vue 如何实现数据的双向绑定

vue 中v-model 指令能实现数据的双向绑定, 本质上就是 input 事件和value 属性的语法糖。
通过v-model 为组件添加 input 事件处理和 value 属性的赋值。

```
<template>
   <input v-model='localValue'/>
</template>

```
上面的组件 就相当于如下代码

```
<template>
   <!-- 这里添加了input时间的监听和value的属性绑定 -->
   <input @input='onInput' :value='localValue' />
   <span>{{localValue}}</span>
</template>
<script>
  export default{
    data(){
      return {
        localValue:'',
      }
    },
    methods:{
      onInput(v){
         //在input事件的处理函数中更新value的绑定值
         this.localValue=v.target.value;
         
      }
    }
  }
</script>

```

# v-model 实现原理

首先我们定义一个Vue组件，相信大家已经很熟悉了。

关键的第一步：给组件设置一个value属性

```
<tempalte>
  <div class="count" @click="addCount">click me {{value}}</div>
</template>
<script>
export default{
      props:{
       //关键的第一步：设置一个value属性
        value:{
          type:Number,
          default:0
        }
      },
        data(){
        return{
          //组件状态，遵守单项数据流原则，不直接修改props中的属性
          localvalue:0
        }
      },
      watch:{
        //监听value变化，更新组件localvalue状态
        value(v){
          this.localvalue=v;
        }  
      },
       created(){
        //初始化获取value值
        this.localvalue=this.value;
      }
      methods:{
        //关键的第二步：事件触发localvalue变更，通过事件同步父组件状态变更
        addCount(){
           this.localvalue++;
           this.$emit('input',this.localvalue);
        }
      },
     
    }
</script>

```

上面的组件定了我们通过在props中添加value属性，并且在值更新时触发input事件。created钩子和watch中为localvalue赋值是为了同步父组件状态到子组件中。
通过上面👆的组件定义，我们就可以在组件上使用v-model指令做双向数据绑定了。


```
<template>
  <add-one v-model="count"></add-one>
  <span>父组件{{count}}</span>
</tempalte>
<script>
export default{
  data() {
    return {
       count: 0,
    };
  },
  methods: {
  },
  created(){   
  }
}
</script>


```



