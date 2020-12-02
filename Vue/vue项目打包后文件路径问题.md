

##  问题： vue 项目打包后 css,js,图片等文件路径报错

在项目的跟目录下创建一个vue.config.js 文件


```javascript

const path = require('path');
const Timestamp = new Date().getTime();
module.exports = {
    publicPath: './',     //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },

    },
    lintOnSave: false,
    // 打包 的 js 文件添加时间戳 解决 js 缓存问题
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    },


};

```
