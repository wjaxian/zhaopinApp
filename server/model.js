const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/bftdb";
mongoose.connect(DB_URL);//链接mongo并且使用testAPP这个数据库（集合）
//监听mongo是否链接成功
mongoose.connection.on("connected",function(){
    console.log("mongodb connect success.")
});


//创建一个表（数据模型），JSOn为字段
// const User = mongoose.model("user",new mongoose.Schema({
//     name:{type:String,require:true},
//     age:{type:Number,require:true},
//     sex:{type:String,require:true},
//     work:{type:String,require:true}
// }));