
>
# Vant 常用组件

>### vant  提供了一些组件和函数，全局引入vant 后，组件可以直接用，但是 <font color="#42B983">函数需要注册后才能用</font>。 
```
  import vant from "vant"
  import  Vue from "vue"
  import {Dialog} from "vant"

  Vue.use(Dialog)

  Dialog.alert({
      title:"标题",
      message:"提示信息内容"
  })
  ```
> ## vant 栅格布局
```
<van-row type="flex" justify">
  <van-col span="6" offset="2">span: 6</van-col>
  <van-col span="6">span: 6</van-col>
  <van-col span="6">span: 6</van-col>
</van-row>

```
1. span  属性值表示在24列栅格中占多多列；
2. offset: 偏移；
3. gutter 属性值用来设置列与列之间的间隔，默认为0；
4. 设置type 属性，可以启用flex 布局
5. justify 属性  end,center, space-around ,space-between ;


> ##  van-button  按钮
 1. block 属性，默认为行内块元素，有了block 属性，就成了块级元素；
 2. plain 属性
 3. loading 属性
 4. loading-text="加载中"；
 5. icon属性， icon="https://imgURL" ;  在按钮上添加图标
 6. disabled 属性
 
> ## van-image 图片
1. fit 属性：  fit="contain" ,还有 fill ,cover ,none 
2. round 属性， 让图片变圆；

> ## van-popup  弹出层
```
<van-popup v-model="false" overlay position="bottom" round duration></van-popup>
```
1.   v-model属性 ： 布尔值， 是否显示弹出层，默认false;
2.  overlay ： 是否显示遮罩层， 默认是 true 
3.  position :  弹出位置;

> ## van-field 输入框
```javasrcipt
<van=field v-model="" 
type="password"
 required
 input-align="center"
 error-messge="密码格式不正确"
 readonly
 disabled
 :rule="[]" />

```
将field 输入框放入 van-form 表单组件中，还可以设置校验属性 :rule="[]"

> ## van-password-input   密码输入框， 有明文和密码展示

> ## van-picker  选择器

> ## 图片预览 函数

>## 
