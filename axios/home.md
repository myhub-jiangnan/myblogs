# axios



## 1. 创建axios实例并添加请求配置

```
let http  = axios.create({
    baseURL:" " , //为实例的方法传递相对URL;
     timeout: 1000,
     headers: {Content-Type': 'application/json; charset=UTF-8' },
    withCredentials: false, // 跨域时是否需要凭证

})
  
```
## 2. 向axios传递相关配置来创建请求

 **<font color='#42B983' size=4.5 >其实是 http.request() 请求的简写 </font>** 

```
  http({
  method: 'post',
  url: '/user/12345',
  // post 请求参数放data里
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  // get 请求参数放params里
  params:{
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

```
  **<font color='#42B983' size=4.5 >为了方便，用axios 提供的别名创建请求 </font>**  

## 3. http.get()

```
      htpp.get(url,{
          params:{
                 // 参数
          }
      }).then(res=>{
          console.log(res)
      })
  
```

## 4. http.post()

```
  http.post(url,{
      // 参数
  }).then(res=>{
      console.log(res)
  })
```












