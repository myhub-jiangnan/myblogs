# 用户输入URL到页面呈现发生了什么？

大致可以分为4个步骤：

* 开启网络请求
* 建立HTTP请求
* 前后端交互
* 页面渲染


### 一. 开启网络请求

浏览器进程拿到用户输入的url，将该url 转发给浏览器网络进程；发起网络请求


### 二. 建立HTTP请求

浏览器网络进程，在真正发起网络请求前，会对url 进行DNS解析。

通过DNS 解析后找到要请求的服务器地址，建立通信链路，使用已有的网络模型，建立TCP链接（三次握手）。此时两台服务器就建立了连接。

### 三. 前后端交互

当建立好TCP链接后，两台服务器就可以通过http 协议进行前后端的通信了。

### 四. 浏览器解析，渲染页面

浏览器通过http 请求，从服务器拿到了所访问的页面文件后，开始进行解析。

1.对html标签进行解析的时候，创建一个文档对象模型(DOM);
也就是根据标签的不同含义，转换成有属性和值对应的对象，最后这个对象呈树形结构，所以
也叫构建DOM树。 DOM树包括了文档内容，但是不包括文档样式。

2.浏览器解析完了html 后，会对css文件进行解析，创建一个层叠样式表对象模型（CSSDOM），类似DOM树的构建，通过对css的解析，把它构建成一个浏览器能够理解的CSSDOM

3. 文档对象模型和层叠样式表对象模型构建完之后，一个代表文档内容，一个代表对应的样式，把两者结合，组合成渲染树（render tree）

4. 最后就是绘制，绘制转换成实际的像素点，呈现在屏幕上。




