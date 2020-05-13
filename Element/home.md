# Element 常用功能


# 表单对象提供的方法：
##  validate（） 验证表单
> this.$refs.form.validate(), 表单要有ref 属性， 属性值为form  ;
```javascript
   this.$refs.refValue.validate(validate=>{
       if(validate){
           console.log("验证通过！");
       }
   });
   varlidate((a,b)=>{})  // validate 方法接收一个回调函数作为参数，回调函数的两个参数，分别表示校验的结果，和校验不通过的字段
```

##  重置表单 resetFields()
> 重置表单后，如果在data 里设置了初始值，则为初始值；

```javascript
  this.$refs.form.resetFields()  // 将整个表单重置
  this.$refs.userName.resetFields() // 只重置 userName 输入框的值;

```