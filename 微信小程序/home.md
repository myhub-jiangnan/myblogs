\

# 微信小程序

1.App: getApp() 获取app实例，通过该实例，可以获取全局数据data

2.page:   Page({})

3.component({}) //

---

5. 自定义属性：  data-xxx ="" 取值：
在事件中通过： event.currentTarget.dataset.xxx 来获取
   
6. 按钮的open-type="getUserInfo" 点击可获得用户信息，用户信息在bindgetuserinf回调函数里 e.detail.userInfo   

7. 修改data值： this.setData({  属性名: 值});
    
    直接 this.data.attrName = "" 数据不能达到响应式效果

8. wx.request() // 发送https 请求

9. 页面跳转：

    优先： navigator

    wx.swicthTab({})  // 跳转到tabBar页面

    wx.reLaunch({})  // 跳转到某个页面，，没有返回按钮

    wx.redirectTo({})  // 跳转到非tabBar 页面  ，默认有返回按钮

    wx.navigateTo()  // 跳转到非tabBar 页面 默认有返回按钮
    
10. 自定义tab页的tabBar： 
     this.getTabBar().setData({
        list: list
      })
    this.getTabBar() 获取当前页的自定义的tabBar 组件实例  ，setData() 设置
    tabBar中的list 值；

11. 自定义组件和自定义tabBar 组件，是两种不同的用法；

    自定义tabBar 组件：https://www.jianshu.com/p/608404463c35?utm_campaign=hugo&utm_content=note&utm_medium=seo_notes&utm_source=recommendation


12.   修改数组中的某个对象的属性

  for (let i = 0; i < length; i++) {
                let item = `list[${i}].showDetail`
                this.setData({
                    [item]: true
                })
            }



-----------------------------------------------------------

> 13.  动态css

   <view class="item {{item.name=='项目'? 'active':''}}"  wx:for="{{title}}">{{item.name}}</view>


> 14. 事件的回调函数 传参

```
 <view class="del" bindtap="edit"  data-projectid="{{item.projectId}}">编辑</view>
  edit(e) {
        let projectId = e.currentTarget.dataset['projectid']
        console.log("项目id:" + projectId);
       
    },
```

> 15. wx:if