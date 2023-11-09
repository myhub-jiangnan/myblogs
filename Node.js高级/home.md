#  node  高级


## node的异步IO



```
  
```


## 事件驱动架构


```
//step1: 引入事件模块
  const EvnentEmitter = require("events")

const myEvent = new EvnentEmitter()

//step2: 监听事件
myEvent.on("事件1", () => {
    console.log("事件1执行了");
})

//step3: 触发事件
myEvent.emit("事件1")
```

## Node.js 单线程

> 单线程如何实现高并发?

异步非阻塞IO 配合事件回调通知。


## Node.js 全局对象

__filename: 返回正在执行脚本文件的绝对路径

__dirname：
timer类函数：

process:  process.env.NODE_ENV // 获取当前的开发环境

require:

module:

exports:

## 核心模块 path

path.resolve()  // 绝对路径

## Buffer 全局缓存区

类似数组，专门用来存储二进制数据，显示的时候是16进制。

IO行为操作的就是二进制数据

大数据传输用流 ,Buffer 一般配合流使用


## 核心模块fs

常用api 和 权限符，标识符，操作符


## VM 模块的使用

> const vm = require("vm")



## 事件模块

很多内置核心模块本身已经继承了 EvnentEmitter 类， 注意是  **<font color='#42B983' size=4.5 >类 </font>** 

on: 添加事件，并定义事件触发时的回调函数

emit: 触发事件，按照注册的顺序同步调用每个事件监听器

once:  添加的事件执行一次后删除监听。 

off:

```
const EvnentEmitter = require("events)

const ev = new EvnentEmitter()

ev.on("事件1",()=>{
    console.log("事件1执行了")
})
  
ev.emit("事件1")

```

## 发布订阅



## 网络通信基本原理

1. 主机之间有传输介质： 网线 wifi 等

2. 主机上必须有网卡设备：

所有的数据都会被转成二进制(0和1不同的排列组合，代表不同的数据)，而网线能传输的是电信号，源源不断的高低电压。

网卡的作用就是完成信号的调制和解调制。把二进制的数据转成高低电压的过程就是数据的调制过程，反之就是解调制。

3. 主机之间需要协商网络速率

不同的主机，网卡可能不一样，每秒传输的电信号量不同，所以主机之间需要协商网络速率。

## 网络通讯方式

交互机通讯 和 路由器通讯两种方式。

> 交互机通讯

不同的主机之间将交换机作为通讯的中转站， 可以完成局域网的需求。

> 路由器

不同局域网之间的主机无法通讯，这时候再路由器作为通讯的中转站。

## 网络层次模型

### OSI 7层模型


> 应用层： 用户与网络的接口 

http协议： 完成网站服务

ftp 协议：文件的传输服务

ssh协议： 远程登录服务

> 表示层： 数据加密、转换、压缩

> 会话层： 控制网络连接建立与终止

> 传输层： 控制数据传输可靠性

这一层是基于端口的协议层，我们数据在封装的时候还必须携带上目标程序占用的端口号

> 网络层： 确定目标网络

这一层是通过路由找到目标网络，常见的是IP 协议

> 数据链路层： 确定目标主机

确定了目标网络，直接进入局域网内，通过MAC 地址去确定目标主机，ARP寻址协议

> 物理层： 各种物理设备和标准

### TPIP 4层模型


**<font size=4.5>应用层：</font>** TPIP 4层模型就是在OSI 7层模型的基础上,将前3层合并，统一称为应用层。http、ftp、ssh.  

 **<font size=4.5>传输层：</font>** 控制数据传输可靠性。端口号。

 **<font size=4.5>主机层：</font>**  把网络层改称为住几层。IP 协议

**<font size=4.5>接入层：</font>** 将数据链路层和物理层 合并称为接入层。


## 数据封装与解封装

 **<font size=4.5>应用层：</font>**  产生要传输的数据  **<font size=4.5>data</font>**  


 **<font size=4.5>传输层:</font>** 基于端口的TCP、UDP协议，数据在这一层会被包裹上 **<font size=4.5>目标端口</font>** 、 **<font size=4.5>源端口</font>** 、 **<font size=4.5>data </font>**   


 **<font size=4.5>网络层：</font>** 因为主机处于不同的网络里，所以需要通过IP协议确定目标主机所在的网络。数据在一层会被包裹上  **<font size=4.5>目标IP</font>** 、 **<font size=4.5>源IP</font>** 、 **<font size=4.5>目标端口</font>** 、 **<font size=4.5>源端口</font>** **<font size=4.5>data </font>**       


 **<font size=4.5>数据链路层：</font>** 数据到了链路层，通过MAC地址完成寻址操作。数据在一层会被包裹上:  **<font size=4.5>目标Mac</font>** 、 **<font size=4.5>源Mac</font>** 、 **<font size=4.5>目标IP</font>** 、 **<font size=4.5>源IP</font>** 、 **<font size=4.5>目标端口</font>** 、 **<font size=4.5>源端口</font>** 、 **<font size=4.5>data</font>**  。 至此，数据就被封装好了。

 **<font size=4.5>物理层：</font>** 封装好的二进制的数据，经过网卡的调制，变成高低电压，通过电缆传输。

 ## TCP 三次握手与四次挥手

 tcp 属于传输层协议，是面相连接的协议，用于处理实时通信。

 ## 创建TCP通信

node 中的Net模块实现了底层通信接口。  

创建服务端：接收和回写客户端数据。

创建客户端：发送和接收服务端数据。

数据传输：内置服务时间和方法读写数据。

node 中

listening 事件: 调用server.listening()之后触发。表示当前服务端开启监听了。

connection 事件： 新的连接建立时触发。

close 事件： 当server 关闭时触发。

error 事件： 当错误出现时触发。

data 事件：当接收到数据时触发。每当某一端调用write方法来发送数据的时候，另一端就可以通过on来监听data 事件。然后处理数据。

write 方法：和data事件是相对的。在socket 上发送数据，默认是UT8编码(不是utf-8)

end 操作： end 事件和end()放法。当socket的一端发送FIN包时触发，结束可读端。


## http 协议


## 代理客户端解决跨域













































