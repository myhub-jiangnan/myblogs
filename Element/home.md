# Element 常用功能


# 表单验证函数 validate（）
> this.$refs.form.validate(), 表单要有ref 属性， 属性值为form  ;
```javascript
   this.$refs.refValue.validate(validate=>{
       if(validate){
           console.log("验证通过！");
       }
   });
```

#  重置表单 resetFields()
> 重置表单后，如果在data 里设置了初始值，则为初始值；

```javascript
  this.$refs["form"].resetFields()  // 将整个表单重置
  this.$refs.userName.resetFields() // 只重置 userName 输入框的值;

```