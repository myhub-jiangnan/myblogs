
## 盒子水平垂直居中的方案

### 定位

 ```javascript

 .box{
    position：absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%)
     }

 ```

### display:flex

```javascript
.box{
      display:flex;
    justify-content: center;
    align-item:center;
}
  
```

## 盒模型

### 标准盒模型

在css 中默认盒模型就是标准盒模型

标准盒模型中， 设置宽高只是给content 部分设置宽高；

### IE 盒模型
设置box-sizing: border-box 即为IE 盒模型；
IE 盒模型中，设置宽高是包括content  padding border这三部分的总和；

### Flex 盒模型 

给父容器设置display:flex ， 就变为弹性伸缩盒子。 子元素按flex 的布局来进行排列；