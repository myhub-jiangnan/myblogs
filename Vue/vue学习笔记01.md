# Vue 学习笔记 

# 1. 插值操作mustache 语法   


```javascript
 <div>祝福你：{{message}}</div>  
 data:{message:"前程似锦"} 

```

``` 简单的表达式：`<div>{{message+ name}}</div>` 或者 `<div>{{message}}{{name}}</div>```

**放到一个{{}} 里有+ 号， 两个{{}}里没有 加号**

<font color="#42B983" size="5">mustache插值法还可以插入methods 里的方法</font>

```javascript
<div>{{getMessage()}}</div>
methods:{
getMessage:function(){
 return this.message ;
}
}
```

# 2. v-hmtl 语法

   `<div v-html="url"></div>`

`data:{url:"<a href="www.baidu.com"></a>}`
**通过v-html 语法可以直接插入html 标签**

# 3. v-bind 绑定属性

**a. 基础用法：<img :src="url">**

**b. 动态绑定class:**  对象或者数组()

**<font color="red" size="5">  <div  :class="{类名1: boolean,类名2: bolean}"></div> </font>**

<font color="red" size="5">`<div :class="{active:isActive,display:isDisplay}"></div> `</font>

**通过控制布尔值来添加类;**

**一定会用到的类 可以直接写在前面**
<font color="red" size="5"><div class="className" :class="{active:isActive,display:isDisplay}"></div> </font>

**最后这些类会自动合并**

**如果觉得这些要控制的类太多，可以把它们放入methods 的方法里**

<font color="red" size="5"><div class="className" :class="getClass()"></div> </font>
<code><pre>
methods:{
 getClass(){
  return : {active:isActive,display:isDisplay}
}
}
</pre></code>
# 4. v-bind 绑定style 属性

<code><pre>
<div :style="{font-size:'50px'}"></div>
<font color="red">注意： value值要用引号引起来，表示是字符串，否则解析的时候会当成是变量，解析出错。</font>
</pre></code>

# 5. 计算属性 computed 

### 基本使用：
<code><pre>
`<div>{{fullname}}</div>`
`<div>{{fullName（）}}</div>`
computed:{
fullName:function（）{
  return this.firstName+ this.lastName ;
}
}，
methods:{
getFullName: function(){
return this.firstName + this.lastName ;
}
}
插值的时候，不用加小括号， 如果是methods 里的方法，则要加小括号，这是因为computed 里的函数，其实直接是一个属性，vue底层对它进行了
封装；
</pre></code>
**<font color="red" size="5">计算属性里的函数尽量不要写动词的名字。比如带get，set之类的，最好像取变量名一样去取方法名，这也体现了计算属性和methods 里方法的区别，计算属性里的方法本质就是一个属性，并不是函数；
</font>**

### 计算属性和methods 的区别：

1. 计算属性里的函数本质上是一个属性 ，属性值是底层封装好的getter 方法；
2. 计算属性常用来对data里的某个属性进行操作，操作之后再在页面显示，只要操作的属性值不变，即使多次调用该计算属性，也只执行一次，因为计算属性计算后的结果有缓存； 而methods 里的函数，每次调用都要重新执行一次该函数； 
>
# 6.  ES6对象字面量增强写法
<code><pre>
let [name,age] =["jack",54]

const obj =  {
name,
age,
print(){
 console.log（this.name + this.age）；
}
}
<font color="red" size="5">优点： 1.添加属性的时候很方便；2. 属性值是函数的时候可以直接省略function 关键字</font>
传统写法：
let name = "jack";
let age = 54;
const obj = {
 name:"jack",
age :54,
print: function(){
console.log( this.name + this.age);
}
}
</pre></code>
# 7. 事件监听
<code><pre>
<div @click="btnClick"></div>
<div @click="btnClick02(a,b)"></div>
</pre></code>
<font color="red" size="5">监听事件时要执行一个函数，如果该函数没有参数可以省略小括号，
mustache中不管有无参数都应该有小括号，如果该函数需要传参数，我们加上了小括号但是我们没有传，会报undefined;如果该函数需要传参数，我们不加小括号同时不传参数，则会默认将浏览器产生的event事件对象作为参数传过去；

</font>

# 8. v-for 绑定key和不绑定key 的区别：

# 9. Vue 中的过滤器
### filters:{} ,也是vue构造函数options 中的选项，调用的时候直接 |过滤器名 ；
<code><pre>
 <div>{{item.price|showPrice}}</div>
 
let vm = new Vue({
 filters:{
   // 在价格前加入人民币符号，并且保留两位小数；
  showPrice(price){
   return "¥" + price.toFixed(2);
}

}
});
</pre></code>

# 10. 常用的循环
### <font color="red" size="5">for...in  遍历数组得到的是数组下标index , 遍历对象得到的是对象的key 值</font>

<code><pre>
let array = [1,2,3,4,5];
let obj = {
  name:"jack",
  age : 54
}
for（let i in array）{
   console.log(array[i]); // 1.2.3.4.5
}
for(let key in obj){
 console.log(i+ ":"+ obj[i]);
}
</pre></code>

###<font color="red" size="5">for...of 只能用于遍历可迭代对象，数组是可迭代对象，遍历数组得到的直接是数组中的元素，对象类型的数据是不可迭代对象，不能用for...of</font>
<code><pre>
 for(let i of array){
 console.log(i);  // 1.2.3.4.5
}
</pre></code>

# 11. 高阶函数
###<font color="red" size="5">定义：所谓高阶函数就是对其他函数进行操作的函数，它接收一个函数作为参数，或者将一个函数作为返回值</font>
### filter ,reduce,map，forEach 这些对数组进行操作的方法，就是高阶函数的例子，也是函数时编程的最好例子；
###<font color="red" size="5">filter的使用：</font>
<code><pre>
  let array = [1,2,3,4,5]
 let newArray = array.filter(function(item){
  return item >2  // 会将小于2的元素会被过滤掉  
});
 let newArray = array.filter(function(item){
  return true ; // 会将数组里所有的元素都添加到新数组中； 
});

</pre></code>
### <font color="red" size="5">filter 接收一个回调函数作为参数，每一个遍历的元素都会在回调函数中进行相应的操作，这个回调函数有一个要求，就是必须返回一个布尔值，如果返回true，则会将该元素自动添加到一个新的数组中，我们只需要声明一个变量来接收这个新数组就可以。</font>
###<font color="red" size="5">map的使用：</font>
<code><pre>
 let newArray02 = array.map(function(item){
  return 100 ; // 会将array 数组里的所有元素都变成100再添加到新数组中；
});
 let newArray03 = array.map(function(item){
  return item*2 ; // 会将array 数组里的所有元素都乘以2再添加到新数组中；
});
</pre></code>

### <font color="red" size="5">reduce的使用：</font>
<code><pre>
let newArray03 = array.reduce(function(preValue,item){
 return preValue + item ;
});
</pre></code>
###<font color="red" size="5">reduce 的完整参数：array.reduce(function(preValue,item,index){
},0); preValue表示每次相加得到的和，item 表示数组里的元素，index 表示数组的下标，回调函数后面还有一个参数0，表示对preValue进行初始赋值；</font>
# 12. v-model 的使用和原理

<code><pre>
<input v-model="message"/>
<div>{{message}}</div>

new Vue({
data: {
 message: "hello vue.js"
}
});

</pre></code>
### v-model 能实现数据的双向绑定，v-model 只是一个语法糖，相当于进行了两步操作：v-bind和input 事件,原理如下：

<code><pre>
<input :value="message"@input="valueChange" />
<div>{{message}}</div>
new Vue({
data: {
 message: "hello vue.js"
},
methods:{
 valueChange(e){
  this.message = e.target.value ;
}
}
});
</pre></code>
### v-model 修饰符
###  <input v-model.lazy="message"/>  当输入框失去焦点时再更新数据；
### <input v-model.number="message" /> v-model 默认输入的数据为string类型，哪怕输入的是number 类型的内容，用number修饰符后就可以返回number类型；
###<input v-model.trim="message">  // 去掉输入的空格

# 13. vue 组件
###1. 组件的使用
<code><pre>
1. 创建组件构造器： const cpnC = Vue.extends({
          templeta:`
      <div>我是父组件</div>
`
})
2. 注册组件（全局注册，多个vue实例中都可以使用）
   Vue.component("cnp",cnpC);  <font color="red" size="5">//注意是两个参数，并不是传入一个对象；</font>

   局部注册(只能在当前vue实例绑带的DOM内使用)
   new Vue({
  el:"#app",
  component:{
  cnp:cpnC
}
})

3. 使用组件
 "<div id="app"》
   《cpn》《/cpn》
 </div》"
</pre></code>
###2. 语法糖 注册组件

<code><pre>
  Vue.component("cnpC1",{
  templeta:`<div></div>`
})
<font color="red" size="5">第二个参数是一个对象，自动调用了创建组件构造器，省去了调用vue.extends（）</font>
</pre></code>

### 3. 区分父子组件 
   在创建vue组件构造器中注册的组件，为当前组件的子组件：
<code><pre>
  const cpnC1 = Vue.extends({
  templeta:`<div>我是子组件</div>`
});
  const cpnC2 = Vue.extends({
       templeta:`<div>我是父组件</div>`,
       component:{
                  cnpC1:"cpnC1"
}
})
"<div id="app"》
   《cpnC2》《/cpnC2》
 </div》"
</pre></code>

### 4. 组件模板的抽离写法，优点： html标签就不用写在js 代码中了，注册的时候直接用id 拿；
 <code><pre>
 <font color="red" size="5">写法1: script 标签type为 text/x-template：</font>

 《div id="app">
  《cnp1></cnp1》
</div》
《scrpit type="text/x-template" id="cnpC1"》
 《div> 
   《p>我是标题</p》
    《h2>我是内容</h2》
</div》 
《/script》  
《script>
   Vue.component("cpn1",{
   template:cnpC1
})
</script》
 <font color="red" size="5">写法2：用template 标签</font>
 《div id="app">
  《cnp1></cnp1》
</div》
《template id="cnpC1">
《div> 
   《p>我是标题</p》
    《h2>我是内容</h2》
</div》 
</template》
《script>
   Vue.component("cpn1",{
   template:cnpC1
})
</script》
</pre></code>
# 14. vue 组件中的data 必须是函数？
<font color="red" size="5">
每个组件都需要自己的独立数据和状态，如果data 是一个对象，那么所有的组件都共享相同的数据和状态，一个组件数据改变了的话，所有组件中的数据也会跟着发生改变，如果data 是一个函数，返回一个对象，这样每个组件都有自己的独立状态和数据，互不影响；
</font>
# 15. vue组件间的通信
### vue 子组件不用引用父组件或者vue 实例的数据 ，
### <font color="red" size="5">父组件传给子组件数据用 props 属性：</font>
<code><pre>
《div id="app">
    <cpn :message="message"></cpn>
</div》
《template id="cpn">
    《div>{{message}}</div》
</template》
   《<script》
        const cpn = {
            template: "#cpn",
            props: ["message"]
<font color="red" size="5">//props是数组时，属性名要加引号</font>
        }
        new Vue({
            el: "#app",
            data() {
                return {
                    message: "你好啊"
                }
            },
            components: {
                cpn 
            },
        });
    </script》
</pre></code>
### <font color="red" size="5">子组件传父组件用自定义事件：在子组件中通过事件触发一个函数，在这个函数中发射一个自定义事件，并传递一个参数，这个参数就是要传递的数据，也就时子组件data中的属性。在父组件中监听这个自定义的事件，父组件监听到了就触发父组件中的一个函数，这个函数会自动接收到子组件传过来的数据，作为自己的参数，在函数中对这个参数进行处理，就达到了数据传递的目的。</font>
<code><pre>
《div id="app">
     // 父组件监听这个自定义事件itemclick
    <cpn @itemclik="itemclik"></cpn>
</div》
《template id="cpn">
        <font color="red" size="5">子组件的事件触发一个函数itemclick，该函数将子组件中的一个属性itemInfo作为参数传给触发的函数</font>
    《div @click="itemclick(itemInfo)">{{itemInfo}}</div》
</template》
   《<script》
        const cpn = {
            template: "#cpn",
            data（）{
              return {
              imtemInfo: "iphone"
}
}
           
            methods:{
                itemclick(itemInfo){
             // 发射一个自定义事件itemclick ,
                 this.$emit("itemclick",itemInfo);
}
}
<font color="red" size="5">//props是数组时，属性名要加引号</font>
        }
        new Vue({
            el: "#app",
            data() {
                return {
                    message: "你好啊"
                }
            },
            components: {
                cpn 
            }, 
            methods:{
          // 父组件中的函数接收子组件传过来的数据作为自己的参数；
           itemclic(itemInfo){
         
          console.log(itemInfo);
}
       }
        });
    </script》

</pre></code>
# 16. v-model 双向绑定的时候，不要绑定到props 里的属性，如果想与props里的属性值达到绑定的效果，要采用间接的方法，也就是v-model 绑定的时候与data里的属性绑定，但是data里属性值通过props 里的属性值来初始化;<font color="red" size="5">props属性本质是要用来跟父组件里的data中的某个属性来绑定的。</font>

<code><pre>
  《div id="app">
      《cpn ：name="name" :age="age"></cpn》
    </div》

  《template id="cpn">
      《div>
       《input v-model="dataName"></input》
       《input v-model="dataAge"></input》  
       </div》
   </template》
  new Vue（{
   el:"app",
   data（）{
       return {
         name:"jack",
         age: 55
      }
    }
   components:{
   cpn:{
   template:"#cpn",
   props:["name","age"],
   data(){
    return {
     dataName:this.name,
     dataAge:this.age
}
}
}
}
}）

</pre></code>

# 17. 父子组件之间的访问方式（通信是传递数据，访问是互相调用各自组件中的方法）

###<font color="red" size="5">父组件访问子组件</font>
###1. this.$children （通过子组件的下标找到子组件对象，优点是很简单方便，缺点是如果子组件很多，或者后面又要插入新的子组件，很可能导致之前子组件的下标也该变了，导致拿错了子组件对象）
<code><pre>
 eg: this.$children[0].showMessage() ; // 在父组件中调用第一个子组件中的showMessage() 方法；
     this/$children[0].name ;  // 在父组件中调用第一个子组件中的 data中的name 属性 ；
</pre></code>
###2. this.$refs (通过子组件的名字找到某个子组件。具体操作就是在子组件上添加一个ref属性，相当于给子组件取了一个名字，再通过this.$refs.ref属性值 拿到子组件。 默认this.$refs 是一个空的对象，比如在子组件上添加ref 属性，才能拿到子组件对象。)
<code><pre>
《cpn ref="son"></cpn》 

  news Vue({
    mouted(){
    this.$refs.son.showMessage();
  }
  })
</pre></code>
### <font color="red" size="5">子组件访问父组件</font>

<font color="red" size="5">1. this.$parent(拿到父组件)</font>
<code><pre>
 eg； this.$parent.showMessage(); // 子组件中拿到父组件对象，调用父组件中的showMessage() ;
      this.$parent.name ;  // 拿到子组件中的data中的name 属性；
</pre></code>
<font color="red" size="5">1. this.$root(拿到VUE 跟实例)</font>
<code><pre>
 eg； this.$root.showMessage(); // 子组件中拿到跟实例对象，调用跟实例中的showMessage() ;
      this.$root.name ;  // 拿到跟实例中的data中的name 属性；
</pre></code>
# 18. 插槽slot 的使用
### slot 插槽让组件有了更好的扩展性；相当于为组件预留了空间，在父组件中用子组件后，又可以针对性的插入一些内容；
<code><pre>
 《div id="app">
   《cpn>《div>我是slot中的内容</div》 </cpn》
  </div》
《template id="cpn">
   《div>
      《div>我是标题</div》
       《slot></slot》
    </div》
 </template》
</pre></code>

# 19. 组件化开发
### 组件化开发，1.可以避免一些全局变量之间的污染； 只要导出的组件名不同，就可以避免全局变量名冲突；2. 增加代码的可复用性；
### <font color="red" size="5">ES5 实现组件化开发的方法：</font> 

  //  a.js 文件中
  const moduleA = (function(){
     var name = "jack",
     function showName(){
     console.log（this.name）；
}    
   var obj = {
     name: this.name;
     showName : this.showName();
}
  return obj ；
  })()

// b.js 文件中
   《script src="a.js"></script》
     moduleA.name ;
     moduleA.showName();


### <font color="red" size="5">ES6 直接实现了模块化开发：可以直接将某个变量暴露出去，其他地方要用直接导入进来就行</font> 
<code><pre>
 // a.js 文件 
  var name ="jack",
  var showName = function(){
    console.log（"showName 方法"）；
}
 export {name:name,showName:showName} 或者直接用对象字面量增强写法： export {name,showName}
// b.js 文件
  《script src="a.js" type="module"></script》
<font color="red" size="5">// 注意： type必须是module，文件是私密的，必须import来能复用代码；</font> 
  import {name ,showName} form "../a.js"  <font color="red" size="5">// 注意： 导入的时候变量名必须同名</font> 

</pre></code>
<font color="red" size="5">export default 的作用：1. 只能导出一个；2. 导出的该变量在别处引入的时候，可以自己改变量名</font>
<code><pre>
export default function(){} // 导出一个函数；
</pre></code>


# 20. webpack
### webpack的作用：
### 1.组件化编程有各种规范，很多规范浏览器不能直接识别，比如如果用commonJS或者Es6 的组件化规范编写代码，浏览器不能识别这些js 代码，而webpack 可以将这些文件进行打包，打包成浏览器能识别的js代码；
### 2.webpack 能处理文件之间的依赖。 比如我们只引入了一个js文件，而这个js 文件中又引入了其他js文件，传统编程我们需要把依赖的其他文件也引入。但是用webpack打包后，webpack能自动找到所有的依赖文件。我们只需要引入一个js文件就行了。
### 3. webpack 本身只能处理打包js 文件，为了也能打包其他类型的文件，比如css ,less，图片等文件，提供了各种loader ;有了这些loader,我们对这些文件也能实现组件化编程，在module 属性里，这这些文件的打包规则进行详细配置就可以；

### <font color="red" size="5">webpack 使用vue的配置：</font>
### 1.通过npm 安装vue 后，再引用vue: import Vue from 'vue'  ; <font color="red" size="5">//默认引用的是vue-runtime-only这版本的vue,而这个版本的vue 中不允许有任何的template; 所以运行时会报错； 而runtime-compiler版本的vue 可以有template,因为compiler可以用于编译template ;</font>
### 2.通过webpack 配置， 引用runtime-compiler：
<code><pre>
module.exports = {
 entry:"",
 output:"",
 module:{}.
<font color="red" size="5">resolve:{
 alias:{
 "vue$":"vue/dist/vue-esm.js"  // 这样操作后引用vue 就引入vue-esm.js
 这个版本的vue,这个版本中有runtime-compiler ;
}
}</font>
}
</pre></code>

### 3. vue中el 和template 的关系：vue 内部el 挂载的DOM 对象会被template中的内容替换掉；

### 4. webpack 中的一些插件plugin:
#### 1.HtmlWebpackPlugin 插件的作用：
#### a. 自动生成一个html文件（可以指定模板，一般是将根目录下的index.html 文件，这样打包后的dist 文件夹中也有index.html文件）
#### b.将打包的js 文件，自动通过script 标签插入body 中；
  


<code><pre></pre></code>
<font color="red" size="5"></font>