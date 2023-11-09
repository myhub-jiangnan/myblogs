#  MySQL


## 1. 常见数据库及分类

> 关系型数据库

MySQL , Oracle , SQL Server


>  飞关系型数据库

MongoDB


## 2.  MySQL Server

专门用来提供数据存储和服务的软件

MySQL Workbench: 可视化的MySQL 管理工具

## 3. SQL 语句

>  SQL 语句中的关键字 对大小写不敏感

表名要区分大小写

> 查询

```
  select * from tableName

  select 

```

> 插入

向 表中插入一条新数据，
```
  insert into tableName (userName,password) values ("jack","3333")

```

> 更新

  将id 为4的用户密码,更新成8888
```
  update tableName set password='8888' where id=4

```

更新若干列
```
  update tableName  set password="3333",status="1" where id=4

```

> 删除

```
  delete from tableName where id=4

```

## 4. node 项目中操作mysql 数据库

```
  // step1. 安装mysql 模块

   npm install mysql 

 // step2:  引入模块

 const mysql = require("mysql")

// step3: 连接数据库
 const  db= mysql.createPool({
     host:"",
     user:"root", //本地mysql 软件的用户名
     password:"admin",
     database:"my_bd_01"  // 要连接的数据库的名字

 }) 

 // step4： 操作数据库

 const sqlStr = "select * from users"

db.query(sqlStr, (err, results) => {
    if (err) {
        return console.log(err.message)
    }
    console.log(results); // 打印users 表中的所有信息
})

```

> 执行select 查询语句，得到的结果是一个数组

## 5. 定义待执行的SQL 语句

> 插入语句
```
    const mysql = require("mysql")

 // 连接到my_db_01 数据库
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "my_db_01"

})

    const sqlStr = 'insert into users (username,password) values (?,?)'

    db.query(sqlStr,[user.userName,user.password],(err,results)=>{
       
        if (err) {
        return console.log(err.message)
    }
    // 如果执行的是insert into 插入语句，则results 是一个对象
    // 可以通过affectRows 属性，来判断是否插入数据成功
    if(results.affectRows===1){
        console.log("插入数据成功")
    }

    })

```  
> 插入数据的便捷方式

```
const mysql = require("mysql")

// 连接到my_db_01 数据库
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "my_db_01"

})

// step1: 要插入到users表中的数据对象
const user = {
    username: "jack",
    password: 123456
}

// step2: 待执行的SQL 语句，其中英文? 表示占位符
const sqlStr = "insert into users set ?"

// step3: 直接将数据对象当作占位符的值
db.query(sqlStr, user, (err, results) => {
    if (err) {
        return console.log(err.message)
    }
    if (results.affectRows === 1) {
        console.log("插入数据成功")
    }
})
  
```

## 6. 定义更新数据的便捷方式

```
  const mysql = require("mysql")


// 连接到my_db_01 数据库
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "my_db_01"

})

// step1: 要插入到users表中的数据对象
const user = {
    id:1,
    username: "jack Ma",
    password: 123456
}

// step2: 待执行的SQL 语句，其中英文? 表示占位符
const sqlStr = "update users set ? where id=?"

// step3: 直接将数据对象当作占位符的值
db.query(sqlStr, [user,user.id], (err, results) => {
    if (err) {
        return console.log(err.message)
    }
    if (results.affectRows === 1) {
        console.log("插入数据成功")
    }
})

```

## 6. 删除语句

```
  const mysql = require("mysql")


// 连接到my_db_01 数据库
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "my_db_01"

})



// step2: 待执行的SQL 语句，其中英文? 表示占位符
const sqlStr = "delete from users where id=?"

// step3: 直接将数据对象当作占位符的值
db.query(sqlStr, 2, (err, results) => {
    if (err) {
        return console.log(err.message)
    }
    if (results.affectRows === 1) {
        console.log("删除数据成功")
    }
})

```

## 7. 标记删除

















