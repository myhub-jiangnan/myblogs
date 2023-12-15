# 微信小程序

> 12. 修改数组中的某个对象的属性

```JavaScript

   for (let i = 0; i < length; i++) {

   let item = `list[${i}].showDetail`
     this.setData({
      [item]: true
        })
}

```

> 14. 事件的回调函数 传参

```
 <view class="del" bindtap="edit"  data-projectid="{{item.projectId}}">编辑</view>
  edit(e) {
        let projectId = e.currentTarget.dataset['projectid']
        console.log("项目id:" + projectId);

    },
```
