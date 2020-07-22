# parcel

### 1. 安装： npm install -g parcel-bundler

### 2. 运行项目：  parcel index.html  index.html 是入口文件

### 3. watch 模式： parcel watch index.html

 parcel 支持热更新， 如果没生效， 可以启动watch 模式

 

 #### 4. 添加parcel 到项目： npm install parcel-bundler --save-dev

 接着，通过修改你的package.json来添加这些任务脚本

```javascript
{
  "scripts": {
    "dev": "parcel <your entry file>",
    "build": "parcel build <your entry file>"
  }
} 

```

