
## 1. 打包后资源路径有问题

在与src平级的跟目录中创建一个vue.config.js 文件

```javascript

const path = require('path');
module.exports = {
    publicPath: './',     //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    },
    lintOnSave: false,
   
};
```


## 2. Vue-cli3 + Webpack多环境打包
.env.dev 文件

```javascript

```

```javascript

 "build": "vue-cli-service build --mode dev",
"build:production": "vue-cli-service build --mode production",

```

### --mode 后面的名称，一定要是.env配置文件的后缀名称。
https://www.jianshu.com/p/d5c60d391474
