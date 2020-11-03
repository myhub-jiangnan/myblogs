

#  easy sass 插件

 ## 可以将sass 文件输出为 wxss, css 等文件


> 1. ctrl+shift+p  输入setting ,选择 "首选项： 打开工作区域设置"（或者直接在项目的.vscode 目录下打开settings.json）

> 2.  编译配置

```javasctipt

"easysass.compileAfterSave": true, //保存后是否编译文件，不需要的时候可以改为false
 "easysass.formats": [
    {
      "format": "expanded", //编译后文件的格式：expanded 不压缩 | compressed 压缩
      "extension": ".wxss" //输出文件后缀：小程序写'wxss'
    }
  ]
  //


```

easysass.formats.format 支持四个选项用以编译生成对应风格的 CSS：

nested：嵌套缩进的 css 代码。
expanded：没有缩进的、扩展的css代码。
compact：简洁格式的 css 代码。
compressed：压缩后的 css 代码。
 