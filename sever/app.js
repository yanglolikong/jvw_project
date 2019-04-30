const mysql = require("mysql")
const express = require("express")
const session = require("express-session")
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "JVW"
})
var cors = require('cors');

var server = express();
server.listen(3000)
server.use(express.static("public"));
server.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));
server.use(session({
  secret: "128位字符串",
  resave: false,
  saveUninitialized: true
}))

const bodyParser = require("body-parser")
server.use(bodyParser.urlencoded({ extended: false }))


const fs=require("fs")

//上传文件用的组件
const multer=require("multer")
var upload=multer({dest:"upload/"})

//用于上传文件的路由
server.post("/uploadFile",upload.single("mypic"),(req,res)=>{
  //获取源文件名
  var size=req.file.size/1000/1000
  if(size>2){
    res.send({code:-1,msg:"上传文件过大，请重新选择"})
    return;
  }
  var type=req.file.mimetype
  var idx=type.indexOf("image")
  if(idx==-1){
    res.send({code:1,msg:"上传文件类型不正确"})
    return;
  }
  var src=req.file.originalname
  //创建新文件名
  var ft=new Date().getTime()
  var tn=Math.floor(Math.random()*9999)
  var i3=src.lastIndexOf(".")
  var suff=src.substr(i3)
  var des=__dirname+"/upload/"+ft+tn+suff
  console.log(des)
  //将临时文件移动到 upload目录下
  fs.renameSync(req.file.path,des)
  res.send({code:1,msg:"上传成功"})
})

//注册的接口
server.post("/regist", (req, res) => {
  var phone = req.body.phone
  var upwd = req.body.upwd
  //没有进行md5加密
  var sql = "select phone from jvw_users where phone=?"
  pool.query(sql, [phone], (err, result) => {
    if (err) { throw err };
    if (result.length == 0) {
      var sql = "insert into jvw_users (phone,upwd) values (?,?)"
      pool.query(sql, [phone, upwd], (err, result) => {
        if (err) { throw err };
        if (result.affcteRows != 0) {
          req.session.phone = phone
          res.send({ code: 1, msg: "注册成功" })
        }
      })
    } else {
      res.send({ code: -1, msg: "该手机号已注册" })
    }
  })
})

// 登陆接口
server.post("/login", (req, res) => {
  var phone = req.body.phone
  var upwd = req.body.upwd
  var sql = "select phone from jvw_users where phone=? and upwd=?"
  pool.query(sql, [phone,upwd], (err, result) => {
    if (err) { throw err };
    if (result.length > 0) {
          req.session.phone = phone
          res.send({ code: 1, msg: "登陆成功" })
        } else {
      res.send({ code: -1, msg: "账号或密码错误" })
    }
  })
})



//验证用户session,用的是用户手机号码验证
//预留的接口，不一定使用
server.get("/session", (req, res) => {
  if (!req.session.phone) {
    res.send({ code: -1, msg: "该用户未登录" })
  } else {
    res.send({ code: 1, msg: "该用户已登陆" })
  }
})

//返回全部的用户数据
///////////////////////////写到这里
server.get("/session_userdata",(req,res)=>{
 var sql=`select * from jvw_users where phone=${req.query.phone}`
  pool.query(sql,(err,result)=>{
    if(err) {throw err};
    res.send(result)
  })
})

//第一页的信息的储存
server.get("/info1", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var sex = req.query.sex
  //将信息更新到当前用户
  var sql = `update jvw_users set sex=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [sex, 1], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第二页的信息的储存
server.get("/info2", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var location = req.query.location
  //将信息更新到当前用户
  var sql = `update jvw_users set location=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [location, 2], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第三页的信息的储存
server.get("/info3", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var birthday = req.query.birthday
  //将信息更新到当前用户
  var sql = `update jvw_users set birthday=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [birthday, 3], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第四页的信息的储存
server.get("/info4", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var marital_status = req.query.marital_status
  //将信息更新到当前用户
  var sql = `update jvw_users set marital_status=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [marital_status, 4], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第五页的信息的储存
server.get("/info5", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var salary = req.query.salary
  //将信息更新到当前用户
  var sql = `update jvw_users set salary=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [salary, 5], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第六页的信息的储存
server.get("/info6", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var character_label = req.query.character_label
  //将信息更新到当前用户
  var sql = `update jvw_users set character_label=?,progress=? where phone=${req.session.phone}`
  pool.query(sql, [character_label, 6], (err, result) => {
    if (err) { throw err };
    if (result.affcteRows != 0) {
      res.send({ code: 1, msg: "更新成功" })
    } else {
      res.send({ code: -1, msg: "更新失败" })
    }
  })
})

//第七页的信息储存
server.get("/info7", (req, res) => {
  console.log(req.session.phone)
  console.log(req.session)
  var uname = req.query.uname
  var manifesto = req.query.manifesto
  //将信息更新到当前用户
  var _sql = `select uname from jvw_users where uname=?`
  pool.query(_sql, [uname], (err, result) => {
    if (err) { throw err };
    if (result.length != 0) {
      res.send({ code: 0, msg: "该昵称已存在" })
    } else {
      var sql = `update jvw_users set uname=?,manifesto=?,progress=?,jvw_money=? where phone=${req.session.phone}`
      pool.query(sql, [uname, manifesto,7,0], (err, result) => {
        if (err) { throw err };
        if (result.affcteRows != 0) {
          res.send({ code: 1, msg: "更新成功" })
        } else {
          res.send({ code: -1, msg: "更新失败" })
        }
      })
    }
  })
})


