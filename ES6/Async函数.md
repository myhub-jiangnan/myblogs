
# Async 函数


1. async 函数会返回一个Promise对象，内部return 语句的返回值会作为then方法回调函数的参数

```javascript
   let test =  async function(){
          return 123
    }

    test().then(data=>{
        console.log(data)   //  123 
    })

```

2. async函数完全可以看作多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖。
  
   特点： 必须等内部所有await命令的Promise对象执行完，才会发生状态改变。也就是说，只有async函数内部的异步操作执行完，
   才会执行then方法指定的回调函数。

   ```javascript
    let getStockPriceByName = async function (name) {
       let  symbol = await getStockSymbol(name);
       let  stockPrice = await getStockPrice(symbol);
       return stockPrice;
    }

    getStockPriceByName('goog').then( result=> {
       console.log(result);
    });

   ```

3. await 命令后面是一个Promise 对象，如果不是，会被转成一个立即resolve的Promise 对象；

```javascript
    let test = async function(){
            return await 123
     }
     test().then(data=>{
         console.log(data)   //  123
     })

```



# Async 函数难点在于错误处理机制


