
 ## 利用rem实现响应式设计 

```javascript
export default function () {
  // 设计稿宽度
  let designSize = 1920;
  let deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
  let htmlFont = deviceWidth * 100 / designSize;
  document.documentElement.style.fontSize = htmlFont + 'px';
 
  window.addEventListener('resize',  ()=> {
    let deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
    let htmlFont = deviceWidth * 100 / designSize;
     // 浏览器窗口小到一定程度，页面不再缩小
    if (htmlFont < 42) {
      document.documentElement.style.fontSize = "42px"
    } else {
      document.documentElement.style.fontSize = htmlFont + 'px';
    }
  },
  )
}
```