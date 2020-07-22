

## 1.  在vue页面另外写一个style ，再加上样式穿透>>> 或者/deep/ (最好用/deep/)


```javascript
// 不要加 lang="scss"
<style scoped> </style>
```

## 2. 样式穿透的作用： 如果组件复用，一处样式修改，不会影响其他地方组件的样式

## 3.  scoped 属性让样式只作用于当前模块
