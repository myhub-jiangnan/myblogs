# Vue 编译原理


   ```
   //vue 模版
    <div id="app" style="color: red; font-size: 20px">hello {{msg}}<h></h></div>
   ``` 

  1.将模板字符串进行解析，利用正则表达式，变成AST 语法树，

 ```
 // AST抽象语法树
 {
        "tag": "div", 
        "attrs": [{ "name": "id", "value": "app" }, { "name": "style", "value": "color: red; font-size: 20px" }], 
        "children": [{ "type": 3, "text": "hello {{msg}}" }, { "tag": "h", "attrs": [], "children": [], "type": 1, "parent": "div" }],
        "type": 1, 
        "parent": null
 }
 ```

  2.接着将ast语法树进行解析变成render 字符串，
 
 ```
 // render 字符串
  _c('div',{id:"app",style:{"color":" red"," font-size":" 20px"}},_v("hello "+_s(msg)),_c('h',undefined))

 ```
  3.再把render 字符串变成render 函数。

     在把render字符串变成函数的过程中，用到了with函数， 
     with的作用把函数中的变量指向了vm实例。
     这样模板中中用了插值语法的地方：比如{{message}}, 本来在解析的过程中，message只是一个字符串。现在message就变成了一个变量，
     并且是一个指向vue实例上的message 属性。 这样我们就可以监测到vue实例上的哪些属性被引用在了模板中。
  ```
    let render = new Function(`with(this){return ${_c('div',{id:"app",style:{"color":" red"," font-size":" 20px"}},_v("hello "+_s(msg)),_c('h',undefined))}}`)
    //render 函数
    ƒ anonymous(
) {
with(this){return _c('div',{id:"app",style:{"color":" red"," font-size":" 20px"}},_v("hello "+_s(msg)),_c('h',undefined))}
}

  ```
 
  4.  再把render函数，变成虚拟dom。用对象的形式描述DOM, 还可以把原来的message字符串换成vue实例中messge的属性值。
  ```
{
            tag:"div",
            data:{"id":"app","style":{"color":" red"," font-size":" 20px"}},
            key: undefined,
            children:[
                 {tag: undefined, data: undefined, key: undefined, children: undefined, text: 'hello vue'},
                 {tag: 'h', data: {}, key: undefined, children: Array(0), text: undefined}],
            text:undefined     
        }
  ```
  5. 最后变成真实dom

```
     <div id="app" style="color: red; font-size: 20px">hello vue <h></h></div>
```