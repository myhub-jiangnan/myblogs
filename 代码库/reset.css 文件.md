

@charset "utf-8";

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html,body{
    /* border: 1px solid red; */
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: #FFFFFF;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", "微软雅黑", sans-serif;
}


/* 图片自适应 */
img {
    display: block;
    width: 100%;
    height: auto;
}

ol,
ul,
li {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

a {
    color: #7e8c8d;
    text-decoration: none;
}

/*清除浮动*/
.clearfix:before,
.clearfix:after {
    content: " ";
    display: inline-block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    *zoom: 1;
}


/* 遮罩层 */

.mask {
    position: absolute;
    background-color: black;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 999;
}

/* 弹窗 */
.dialog {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    /* width: 14.586667rem;
    height: 23.306667rem; */
    z-index: 1000;
}

