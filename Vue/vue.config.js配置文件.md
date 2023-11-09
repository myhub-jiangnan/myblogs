

在与src平级的跟目录中创建一个vue.config.js 文件

## 1. 打包后资源路径有问题

```javascript
module.exports = {
    publicPath: './',     //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
};
```

## 2. 关闭语法检查

```javascript
module.exports = {
   lintOnSave: false,  // 关掉语法检查
};
```


## 3. 打包 的 js 文件添加时间戳 解决 js 缓存问题

```javascript

const path = require('path');
const Timestamp = new Date().getTime();
module.exports = {
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    },
   
};
```

## 4.  本地开发配置

```javascript

module.exports = {
    devServer: { 
        open:true,  // 编译完成打开网页
        host:"8080",  // 指定端口号  
        hot:true , // 开启热加载
        overlay: {  //
            warnings: false,
            errors: false
        },

        }
    },
   
};
```


