const express = require("express");
const app = express();

const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/testapp";
mongoose.connect(DB_URL);//链接mongo并且使用testAPP这个数据库（集合）
//监听mongo是否链接成功
mongoose.connection.on("connected",function(){
    console.log("mongodb connect success.")
});


//创建一个表（数据模型），JSOn为字段
const User = mongoose.model("user",new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true},
    sex:{type:String,require:true},
    work:{type:String,require:true}
}));

//create 新增数据
// User.create({
//     name:"Toney",
//     age:24,
//     sex:"man",
//     work:"Programmer"
// },function(err,doc){
//     if(!err) {
//         console.log(doc)
//     }else{
//         console.log(err)
//     };
// });

// remove 删除数据
// User.remove({name:"Toney"},function(err,doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// });

//update 更新数据
// User.update({name:"比较叼的一条数据"},{$set:{
//     name:"小明"
// }},function (err,doc){
//     console.log(doc)
// });

app.get("/",function(req,res){
    res.send("wellcom to express!")
});

app.get("/user",function(req,res){
    //find 查询数据
    User.findOne({name:"Toney"},function(err,doc){
        res.json(doc);
    })

    // findOne 只查询一条数据
    // User.findOne({name:"Toney"},function(err,doc){
    //     res.json(doc);
    // })
});

app.listen("9093",function(){
    console.log("open Browser http://localhost:9093");
});


// app.use  使用模块
// app.get   app.post 分别开发get和 post接口
// res.send  返回文本   res.json  返回对象   res.sendfile 返回文件  / 分别用来响应不同内容


