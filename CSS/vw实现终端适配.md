原文链接： https://aotu.io/notes/2017/04/28/2017-4-28-CSS-viewport-units/index.html

利用视口单位实现适配布局

响应式布局的实现依靠媒体查询（ Media Queries ）来实现，选取主流设备宽度尺寸作为断点针对性写额外的样式进行适配，但这样做会比较麻烦，只能在选取的几个主流设备尺寸下呈现完美适配。
即使是通过 rem 单位来实现适配，也是需要内嵌一段脚本去动态计算根元素大小。

近年来，随着移动端对视口单位的支持越来越成熟、广泛，使得我们可以尝试一种新的办法去真正地适配所有设备尺寸。

认识视口单位（ Viewport units )
首先，我们要了解什么是视口。

在业界，极为推崇的一种理论是 Peter-Paul Koch (江湖人称“PPK大神”)提出的关于视口的解释——在桌面端，视口指的是在桌面端，指的是浏览器的可视区域；而在移动端较为复杂，它涉及到三个视口：分别是 Layout Viewport（布局视口）、 Visual Viewport（视觉视口）、Ideal Viewport。

而视口单位中的“视口”，在桌面端，毫无疑问指的就是浏览器的可视区域；但是在移动端，它指的则是三个 Viewport 中的 Layout Viewport 。



视口单位中的“视口”
根据CSS3规范，视口单位主要包括以下4个：

vw : 1vw 等于视口宽度的1%
vh : 1vh 等于视口高度的1%
vmin : 选取 vw 和 vh 中最小的那个
vmax : 选取 vw 和 vh 中最大的那个
视口单位区别于%单位，视口单位是依赖于视口的尺寸，根据视口尺寸的百分比来定义的；而%单位则是依赖于元素的祖先元素。



用视口单位度量，视口宽度为100vw，高度为100vh（左侧为竖屏情况，右侧为横屏情况）
例如，在桌面端浏览器视口尺寸为650px，那么 1vw = 650 * 1% = 6.5px（这是理论推算的出，如果浏览器不支持0.5px，那么实际渲染结果可能是7px）。




利用视口单位适配页面
对于移动端开发来说，最为重要的一点是如何适配页面，实现多终端的兼容，不同的适配方式各有千秋，也各有缺点。

就主流的响应式布局、弹性布局来说，通过 Media Queries 实现的布局需要配置多个响应断点，而且带来的体验也对用户十分的不友好：布局在响应断点范围内的分辨率下维持不变，而在响应断点切换的瞬间，布局带来断层式的切换变化，如同卡带的唱机般“咔咔咔”地一下又一下。

而通过采用rem单位的动态计算的弹性布局，则是需要在头部内嵌一段脚本来进行监听分辨率的变化来动态改变根元素字体大小，使得 CSS 与 JS 耦合了在一起。

有没有办法能够解决这样的问题呢？

答案是肯定的，通过利用视口单位实现适配的页面，是既能解决响应式断层问题，又能解决脚本依赖的问题的。

## 做法一：仅使用vw作为CSS单位
在仅使用 vw 单位作为唯一应用的一种 CSS 单位的这种做法下，我们遵守：

1.对于设计稿的尺寸转换为vw单位，我们使用Sass函数编译

```javascript
//iPhone 6尺寸作为设计稿基准
$vw_base: 375; 
@function vw($px) {
    @return ($px / 375) * 100vw;
}
```

2.无论是文本还是布局高宽、间距等都使用 vw 作为 CSS 单位

```javascript
.mod_nav {
    background-color: #fff;
    &_list {
        display: flex;
        padding: vw(15) vw(10) vw(10); // 内间距
        &_item {
            flex: 1;
            text-align: center;
            font-size: vw(10); // 字体大小
            &_logo {
                display: block;
                margin: 0 auto;
                width: vw(40); // 宽度
                height: vw(40); // 高度
                img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                }
            }
            &_name {
                margin-top: vw(2);
            }
        }
    }
}
```

3.1物理像素线（也就是普通屏幕下 1px ，高清屏幕下 0.5px 的情况）采用 transform 属性 scale 实现。
```javascript
.mod_grid {
    position: relative;
    &::after {
        // 实现1物理像素的下边框线
        content: '';
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #ddd;
        height: 1px;
        left: 0;
        right: 0;
        top: 0;
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            -webkit-transform: scaleY(0.5);
            -webkit-transform-origin: 50% 0%;
        }
    }
    
}
```

4.对于需要保持高宽比的图，应改用 padding-top 实现
```javascript
.mod_banner {
    position: relative;
    padding-top: percentage(100/750); // 使用padding-top
    height: 0;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
    }
}
```




```javascript

  





```






## 做法二：搭配vw和rem，布局更优化
这样的页面虽然看起来适配得很好，但是你会发现由于它是利用视口单位实现的布局，依赖于视口大小而自动缩放，无论视口过大还是过小，它也随着视口过大或者过小，失去了最大最小宽度的限制。

当然，你可以不在乎这样微小的不友好用户体验，但我们还是尝试下追求修复这样的小瑕疵吧。

于是，联想到不如结合rem单位来实现布局？rem 弹性布局的核心在于动态改变根元素大小，那么我们可以通过：

给根元素大小设置随着视口变化而变化的 vw 单位，这样就可以实现动态改变其大小。
限制根元素字体大小的最大最小值，配合 body 加上最大宽度和最小宽度
这样我们就能够实现对布局宽度的最大最小限制。因此，根据以上条件，我们可以得出代码实现如下：

```javascript

// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}

// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}

// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}

// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}

// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```



小结
相对于做法一，个人比较推崇做法二，有以下两点原因：

第一，做法二相对来说用户视觉体验更好，增加了最大最小宽度的限制；

第二，更重要是，如果选择主流的rem弹性布局方式作为项目开发的适配页面方法，那么做法二更适合于后期项目从 rem 单位过渡到 vw 单位。只需要通过改变根元素大小的计算方式，你就可以不需要其他任何的处理，就无缝过渡到另一种CSS单位，更何况vw单位的使用必然会成为一种更好适配方式，目前它只是碍于兼容性的支持而得不到广泛的应用。

