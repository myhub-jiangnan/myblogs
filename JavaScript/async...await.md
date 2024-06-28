# async ... await

#### 1.异步问题

```
 function drive() {
        setTimeout(() => {
          console.log("开车去商城");
        }, 3000);
      }

function shopping() {
        setTimeout(() => {
          console.log("开心购物");
        }, 1000);
      }

drive();
shopping();

// 我们希望执行顺序是"开车去商城"，再执行 开心购物，结果由于异步问题，并没有实现我们想要的顺序

```

#### 2. 通过回调函数解决异步问题

```
 function drive() {
        setTimeout(() => {
          console.log("开车去商城");
          shopping();
        }, 3000);
      }

function shopping() {
        setTimeout(() => {
          console.log("开心购物");
        }, 1000);
      }

drive();

// 缺点： 如果异步任务很多，函数的层层嵌套，容易带来回调地狱问题

```

#### 3. 通过 Promise 解决异步问题

```
 function drive() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("开车去商城");
          }, 3000);
        });
      }

function shopping() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("开心购物");
          }, 1000);
        });
      }

drive().then((data) => {
          console.log(data);
          return shopping();
        }).then((data) => {
          console.log(data);
        });

 // 优点： 相比通过回调函数来解决异步问题， promise 通过链式调用，以同步代码的方式来组织代码，可读性和维护性更强。

```

#### 4. 通过 async...await 更优雅的组织代码

```
 function drive() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("开车去商城");
          }, 3000);
        });
      }

function shopping() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("开心购物");
          }, 1000);
        });
      }

// 用自执行函数来执行
  (async () => {
        console.log(await drive());
        console.log(await shopping());
      })();



```

aysnc 关键字用来声明一个函数为异步函数， 该函数会返回一个 Promise 对象。await 关键字只能在 aysnc 声明的函数内部使用，并且会等待 Promise 完成,拿到 promise 返回的结果。
