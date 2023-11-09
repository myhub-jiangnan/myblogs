

> # render 函数


```javascript
  render: h=>h(App)
```
在vue 中 h 是createElment() 函数的缩写，用来创建一个 虚拟DOM元素，参数App 表示创建App组件为模板，创建并渲染后，用来替换挂载的元素。上面一句代码是以下代码的简写



```javascript
render: function(createElement){
    return createElement(App)
}

```

render 通过JavaScript代码来创建模板字符串, 相对于template属性更加灵活。