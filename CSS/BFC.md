## 什么是BFC



overflow: hidden  创建BFC

子元素浮动，带来父元素坍塌：

.father:: before {
    content:　'',
    display: table
}    