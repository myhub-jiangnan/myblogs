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

---

## 修改input 样式
   
```javascript
 /deep/ .el-textarea {
                        padding: 0;
                        padding-left: 0.1rem;
                        border: none;
                        height: 100%;
                        // border: 1px solid red;
                    }

 /deep/ .el-textarea__inner {
                        height: 100%;
                        padding: 0;
                        border: none;
                    }

```

## upload  上传文件

upload  上传图片文件的时候，要注意传到后端的数据应该是 form 格式， 通过 new FormData()创建一个实例对象，

```javascript
  在上传成功的钩子函数中，将file 添加到 form对象中

  data(){
      return {
          formData: new FormData()
      }
  }

   methods:{
     // 图片上传成功钩子
      upLoadSuccess(response, file, fileList) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                this.upFile = fileList
                console.log(file);
                this.formData.append("file", file)
                // 上传图片获得图片id
                imgUpload({
                    file: this.formData
                }).then(res => {
                    let resData = res.data.result.id
                })
            },

   }
```
