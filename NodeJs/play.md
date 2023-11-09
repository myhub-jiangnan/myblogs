

> 1.获取设备列表
```
      url:`/api/device/query/devices`,
     method: 'get',
      params: {
        page: currentPage,
        count: count
      }
  ```
>  2.获取 Chanel

```
method: 'get',
      url: `/api/device/query/devices/${deviceId}/channels`,
      params:{
        page: currentPage,
        count: count,
        query: "",
        online: "",
        channelType: isCatalog,
        catalogUnderDevice: catalogUnderDevice
      }
```


> 3.获取subChannel

```
 method: 'get',
      url: `/api/device/query/sub_channels/${deviceId}/${channelId}/channels`,
      params:{
        page: currentPage,
        count: count,
        query: "",
        online: "",
        channelType: isCatalog
      }

  ```

 > 4. 通知设备推流

 ```
    method: 'get',
 url: '/api/play/start/' + deviceId + '/' + channelId
 
 ``` 