const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/bft-db";
mongoose.connect(DB_URL);//链接mongo并且使用testAPP这个数据库（集合）
//监听mongo是否链接成功
mongoose.connection.on("connected",function(){
    console.log("mongodb connect success.")
});

const models = {
    //user表
    user: {
        "username":{"type":String,"require":true},//用户名
        "password":{"type":String,"require":true},//密码
        "type":{"type":String,"require":true},//职业类型
        "sex":{"type":String},
        "tel":{"type":Number},
        "avatar":{"type": String},//头像
        "desc":{"type":String},//个人简介或者职位介绍
        "title":{"type":String},//职位名称
        //牛人
        // "intentionMoney":{"type":String},//意向薪水
        //Boss 补充信息
        "money":{"type":String},//职位薪水
        "company":{"type":String}//公司
    }
}

//遍历生成所有表
for (let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    //获取表的方法
    getModel:function(name){
        return  mongoose.model(name);
    }
}



//创建一个表（数据模型），JSOn为字段
// const User = mongoose.model("user",new mongoose.Schema({
//     name:{type:String,require:true},
//     age:{type:Number,require:true},
//     sex:{type:String,require:true},
//     work:{type:String,require:true}
// }));