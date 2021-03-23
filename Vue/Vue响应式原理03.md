

##  对象响应式

proxy 一次劫持一个对象，Object.definedProperty() 是一个属性一个属性的劫持


>   核心是要做到 一个key 对应一个Dep 实例

> 思路

###   1.创建一个WeakMap对象，一个对象对应一个Map 数据结构的值, let depsMap = new Map()

###   2. depsMap 里 一个key 对应一个Set 结构的值， let dep = new Set()

###   3. dep 里存储的是一个个effect,因为一个key 可能有多个effect,effect 就是依赖 let effect=()=>{b=a+10 }


```
 // 用来存放effect
        let currentEffect
        class Dep {
            constructor() {
                this.effects = new Set()
            }
            depend() {
                if (currentEffect) {
                    this.effects.add(currentEffect)
                }
            }
            notice() {
                this.effects.forEach(item => {
                    item()
                })
            }
        }


```


```

        // 收集依赖的方法
        function effectWatch(effect) {
            currentEffect = effect
            effect()
            currentEffect = null
        }


```


```
 // 处理一个对象，
        //   拿到key 对应的dep ,没有dep创建dep
        let targetMap = new WeakMap() // 用来存放 对象和depsMap
        function getDep(target, key) {
            let depsMap = targetMap.get(target) // 通过对象target取depsMap
            if (!depsMap) {
                targetMap.set(target, (depsMap = new Map()))
            }
            let dep = depsMap.get(key)  // 通过key 取 dep
            if (!dep) {
                //注意 dep = new Dep()
                depsMap.set(key, (dep = new Dep()))
            }
            return dep
        }

```


```
   // 创建一个方法，用来将一个对象变成响应式对象
        // 参数raw 就是要传的对象 

        function reactive(raw) {
            // 使用proxy 的好处是，不管user里有多少个属性，只要像上面一样，设置一个get和set
            // 就都被代理了
            return new Proxy(raw, {
                get(target, key) {
                    const dep = getDep(target, key)
                    dep.depend()
                    // Reflect.get（）是通过函数执行来读取一个对象的属性
                    // console.log("价格：");
                    // console.log(dep);
                    return Reflect.get(target, key)
                },
                set(target, key, value) {
                    const dep = getDep(target, key)
                    Reflect.set(target, key, value)  // 返回的是布尔值，是否给对象设置属性成功
                    dep.notice()
                }
            })
        }

        let product = {
            price: 10,
            quanity: 5
        }

        let p = reactive(product)
        let total;
        effectWatch(() => {
            total = p.price * p.quanity
            console.log("价格", total);
        })

        p.price = 12
        p.price = 13
        p.price = 15
```
  
       
     
