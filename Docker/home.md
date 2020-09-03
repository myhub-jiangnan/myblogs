
## 解决Windows下无法对docker容器进行端口映射的问题

在安装了一个Windows下安装了docker，并尝试在其中运行Nginx服务，但映射完毕之后，在主机的浏览器中，打开localhost:port无法访问对应的服务。


原因：docker是运行在Linux上的，在Windows中运行docker，实际上还是在Windows下先安装了一个Linux环境，然后在这个系统中运行的docker。也就是说，服务中使用的localhost指的是这个Linux环境的地址，而不是我们的宿主环境Windows。

找到这个Linux的ip地址，一般情况下这个地址是192.168.99.100（docker-machine ip default 命令查找），然后在Windows的浏览器中，输入这个地址，加上服务的端口即可启用

如docker run -d -p 8080:80 nginx

后再windows上访问 http://192.168.99.100:8080/即可