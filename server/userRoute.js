const express = require("express");
const Router = express.Router();
const utility = require("utility");
const models = require("./model");

const _filter = {password:0,__v:0};

const User = models.getModel("user");//获取用户表

Router.get("/remove",function(req,res){
    //从user表清除所有的user
    User.remove({},function(err,doc){
        return res.json(doc)
    })
})

Router.get("/list",function(req,res){
    //从user表查询数据
    User.find({},function(err,doc){
        return   res.json(doc);
    })
})

//注册接口
Router.post("/register",function(req,res){
    const {username,password,type} = req.body;//获取请求传递过来的参数

    User.findOne({username},function(err,doc){
        if(doc){
            return res.json({code:0,msg:"用户已注册"})
        }
        //插入数据
        const userModel = new User({username,type,password:md5(password)});
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:0,msg:"后端出错"})
            }
            const { username,type,_id } = doc;
            res.cookie("userId",_id)
            return res.json({code:1,msg:"注册成功",data:{ username,type,_id }})
        })
        // User.create({username,type,password:md5(password)},function(err,doc){
        //     if(err){
        //         return res.json({code:0,msg:"后端出错"})
        //     }

        //     return res.json({code:1,msg:"注册成功",data:{}})
        // })
    })
})

//登录接口
Router.post("/login",function(req,res){
    const {username,password} = req.body;
  
    User.findOne({username,password:md5(password)},function(err,doc){
        if(doc){
            User.findOne({password:md5(password)},_filter,function(err,doc){
                if(doc){
                    res.cookie('userId',doc._id);
                    return res.json({code:1,msg:"登录成功",data:doc})
                }
                return res.json({code:0,msg:"密码错误"})
            })
        }else{
          return res.json({code:0,msg:"用户名错误"})
        }
    })
});

//md5 严加密函数
function md5(c){
    const str = 'BFT_ZhaoPin@app_DB';
    c = utility.md5(utility.md5(str+c));
    return c;
}

//获取用户信息接口
Router.get("/info",function(req,res){
    const {userId} = req.cookies;
    if(!userId){
        return res.json({code:0})
    }

    User.findOne({_id:userId},_filter,function(err,doc){
        if(err){
            return res.json({code:0,msg:"后端出错"})
        }

        return res.json({code:1,msg:"获取成功",data:doc})
    })
})

module.exports = Router;