# JSON 对象
 最重要的是搞清楚 JSON 是什么：json 只是一种数据格式，不是一种编程语言，j'son数据类型的定义不是按编程语言中的数据类型来定义的，而是根据数据的格式。如果按编程语言中的数据类型来定义，那就只有字符串一种类型

前后端进行数据的传输交换，传输的只是一个文本，这个文本中的数据是按格式的不同来区分的，而不是按编程语言中的数据类型来区分，只需要知道这个数据的格式，然后用编程语言中特定方法转换成编程语言中的数据类型，以供处理。常用的有json 文本和xml 文本；


 ### json数据有3中类型：
  json文本中的数据不是固定一种格式，而是 有3种格式，于是我们称作有3种类型： 简单值，对象，数组在json中没有json 对象这个说法，只能说这个json 数据格式是对象类型，用来说明这个json 的数据格式；js中提供了一个全局的JSON 对象，注意必须是大写；
              


### 前后端数据交换： 
前端将一个有数据类型的数据序列化成一个 json格式的数据 传给后端 ，用JSON.stringfity() 方法；//对象转字符串后端将一个有数据类型的数据序列化成一个json格式的数据传给前端 ，前端拿到后解析成有数据类型的数据，即js中的对象类型。前端用JSON.parse() 方法； // 字符串转对象； 
        
1.在json 出现之前，一直用xml 来传递数据，xml是一种纯文本格式（即只保存文本，不保存格式，比如大小，颜色，粗体或斜体等格式）

2.JSON 文本格式 是当时雅虎的一位叫道格拉斯的架构师发明的一种文本格式，属于javascript 的子集；比xml 更快，更小，更好解析；

3.JSON 数据类型有： 简单值 ，  对象 ， json 数组；

     简单值：  "hello json"  ,  100    

    json   对象：  {"name":"jack" ,"age":100} 

     json  数组： ["jack",100,"rose" ]

  注意： key 值必须用双引号
不同于：json  字符串： '{"name":"jack" ,"age":100}  '把json 用引号引起来 就成了js 中的字符串；
json是js 对象的字符串表示法，它使用文本表示一个js 对象的信息，本质是字符串，这样我们就可以把对象的属性信息打印出来。 
 js 对象：  let  ob ={name:"jack",age:100} //有声明， 属性不必打双引号 let  ob ={"name":"jack","age":100}// 也可以这样定义；
    对象不能直接打印出来，打印出的只是对象的内存地址，需要就js 对象
转化成字符串打印出来，
 js  数组：  let arr = [ "jack",100,"rose" ]   // 有声明；

4.要区分 JavaScript对象， JSON 对象，和JSON 字符串的区别
      js对象是一种数据类型，json对象是一个json 文本格式，json 字符串本质是
   js 字符串，因为js 对象不能直接打印， 我们就将js 对象序列化成字符串。
JavaScript对象要有声明 ，json数据不必有声明；

5.不同的语言有不同的JSON 解析器和序列化器；

6.有关序列化 和 json  解析： 
eg： let  person = {
        name: "xiaoming" ,
        age:  12 ,
        gender: true ,
        grade : null,
        skills: ["css","html","JavaScript"] ，
        school  : {
          name: "光明中学"，
         address：“上海”
}
}
JSON 序列化，是将JavaScript对象（js字符串也是对象）序列化成 json 字符串，一个j's对象可以取到对象的属性值 ，j'son 字符串就只是一个字符串了；
将上面的person 对象 ，序列化成j'son 字符串：
 JSON.stringify(person);

只序列化部分：
JSON.stringify(person ,["name","school "]);
还可以传入一个函数：
JSON.stringifty(person,function(){
    console.log("hello json");
});

5. 反序列化：
         JSON.parse()  //  将一个json 字符串转换成js 对象；
注意：  是将一个json 字符串转换成js 对象；

     let  a = {"name":"jack","age": 12}  //  这并非json 字符串，只是js 对象字面量；
    let b = ' {"name":"jack","age": 12} '  // 这才是json 字符串； 必须有引号，不存在JSON 对象，只有js 内置的JSON 对象，才是真正的JSON对象；
 eg:    JSON.parse(b); // 得到js 对象；
           JSON.parse(a)  // 因为 a 变量中存的是一个json 对象，无法解析 。
   其实到这里根本就不必解析json 对象 ，
   a.name  //  jack  ; 可以直接拿到json 对象中的属性；
        

6. eval（） 函数可以将 json 文本转换成js 对象；
  eval("("+b+")") ;

资料参考 ： https://www.cnblogs.com/TomXu/archive/2012/01/11/2311956.html