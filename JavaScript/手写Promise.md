# Promise 核心源码实现

## 凝固 Promise 状态

```javascript
class Promise {
  constructor(executor) {
    this.state = "pending";
    this.response = null;
    this.err = null;
    let resolve = (data) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.response = data;
      }
    };
    let reject = (data) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.err = data;
      }
    };
    executor(resolve, reject);
  }

  then(onResolved, onRejected) {
    if (this.state === "fulfilled") {
      onResolved(this.response);
    }
    if (this.state === "rejected") {
      onRejected(this.err);
    }
    if (this.state === "pending") {
      console.log("状态仍是pending");
    }
  }
}

let p = new Promise((resolve, reject) => {
  resolve("成功");
  reject("失败"); //一旦执行了resolve(),reject()就失效，反之亦然。
});

p.then(
  (res) => {
    console.log("resolve 传过来的数据", res);
  },
  (err) => {
    console.log("reject 传过来的数据", err);
  }
);
```

> 从上面的代码可以看出， resolve() reject() then() 都干了些什么和作用，

## 处理异步

```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了！");
  }, 2000);
});

p.then(
  (res) => {
    console.log("resolve 传过来的数据", res);
  },
  (err) => {
    console.log("reject 传过来的数据", err);
  }
);
```

如上面的代码所示，在异步任务里执行 resolve()，并返回一个参数，但是这样带来了一个问题，还没拿到 resolve 返回的数据(实际业务开发中，我们往往把异步任务的结果作为 resolve 的参数) ，then 方法就执行了，我们无法处理 resolve 返回的参数。这显然不是我们想要的效果。

```javascript
class Promise {
  constructor(executor) {
    (this.state = "pending"), (this.response = null), (this.err = null);
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];
    let resolve = (data) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.response = data;
        this.onResolvedCallback.map((item) => item());
      }
    };
    let reject = (data) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.err = data;
        this.onRejectedCallback.map((item) => item());
      }
    };
    executor(resolve, reject);
  }

  then(onResolved, onRejected) {
    if (this.state === "fulfilled") {
      onResolved(this.response);
    }
    if (this.state === "rejected") {
      onRejected(this.err);
    }
    if (this.state === "pending") {
      console.log("状态任然是pending");
      this.onResolvedCallback.push(() => {
        onResolved(this.response);
      });
      this.onRejectedCallback.push(() => {
        onRejected(this.err);
      });
    }
  }
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了！");
  }, 2000);
});

p.then(
  (res) => {
    console.log("resolve 传过来的数据", res);
  },
  (err) => {
    console.log("reject 传过来的数据", err);
  }
);
```

#### 原本的执行思路是：只要创建了一个 Promise 实例对象，那么就先执行 resolve(), 再执行 then(), 让 then()处理 resolve 传过来的数据。 现在的情况变成了 then 反而比 resolve 先执行。

#### 那我们的思路就变成了，给 then 方法提供一个回调函数，这个回调函数的作用就是用来处理 resolve 传过来的数据。执行 then 方法的作用就是把这个回调函数放入一个数组。

#### 当异步任务有了结果 data 时，执行 resolve 并传入 data 时，resolve 就让数组里的 回调函数来处理传入的 data.

## 实现 then 方法的链式调用

为了实现链式调用，

1. 上一个 then()要返回一个 Promise 对象 (Promise 对象才有 then 方法)

2.上一个 then()的回调的返回值，作为下一个 then()的参数(上一个 then 的回调函数处理完数据，传给下一个 then,进一步进行相关操作)

```javascript
class Promise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined; //记录成功的值, 将来给.then() 用
    this.reason = undefined; // 记录失败的值， 将来给 .catch()用

    this.onResolvedCallback = []; // 存放当成功时，需要执行的函数
    this.onRejectedCallback = [];

    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 遍历 成功数组，执行里面的存放的函数
        this.onResolvedCallback.map((item) => item());
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
      }
    };

    executor(resolve, reject);
  }

  then(onFulFilled, onRejected) {
    // onFulFilled => p 成功后，调用的回调函数
    return new Promise((resolve, reject) => {
      if (this.state === "fulfilled") {
        let x = onFulFilled(this.value); // 对then 回调函数的返回值类型进行判断
        resolvePromise(x, resolve, reject);
      }
      // onRejected => p 失败后，调用的回调
      if (this.state === "rejected") {
        onRejected(this.reason);
      }
      // 当状态为pending 时
      if (this.state === "pending") {
        // 将成功时候要干的事存起来
        this.onResolvedCallback.push(() => {
          onFulFilled(this.value);
        });
        this.onRejectedCallback.push(() => {
          onRejected(this.reason);
        });
      }
    });
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断X 是否是一个promise
  if (x instanceof Promise) {
    x.then(
      (val) => {
        resolve(val);
      },
      (err) => {
        reject(err);
      }
    );
  } else {
    //普通值
    resolve(x);
  }
}

let p = new Promise((resolve, reject) => {
  resolve("传给第一个then");
});

p.then((res) => {
  console.log(res);
  return "传给第二个then"; // 普通数据
})
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      //返回一个promise
      resolve("传给第三个then");
    });
  })
  .then((res) => {
    console.log(res);
  });
```
