
## 1. 用法

### 1.两者在语义中有明确的区别： null表示一个值被定义了，定义为"空值" 。undefined 表示根本没有定义；

```javascript
    // 所以如下设置是合理的
    let a = null  
    let b = undefined  // 不合理
```

### 2. null 表示"没有值"， 该处不应该有值； undefined 表示"没有值"，该处应该有值，但是还没有定义; 


### 3.null数据类型为 object ，转为数值时为0。undefined也可以说是表示无的原始值，  数据类型为 undefined，转为数值时为NaN ;


## 2. 同时存在null和undefined的原因

而 JavaScript 是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（因为存不存在只在运行期才知道），
所以这就要一个值来表示对某成员的 getter 是取不到值的。