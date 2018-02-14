const express = require("express");
const Router = express.Router();
const utility = require("utility");
const models = require("./model");


const _filter = {password:0,__v:0};

const User = models.getModel("user");//获取用户表
const Yzm = models.getModel("yzm");//获取验证码表
const Chat = models.getModel("chat");//聊天表

//清空数据表接口
Router.get("/remove",function(req,res){
    //从user表清除所有的user
    // User.remove({},function(err,doc){
    //     return res.json(doc)
    // })

    // Yzm.remove({},function(err,doc){
    //     return res.json(doc)
    // })

    Chat.remove({},function(err,doc){
        return res.json(doc)
    })
})

//获取所有用户接口
Router.get("/gets",function(req,res){
    //从user表查询数据
    User.find({},function(err,doc){
        res.json(doc);
    })
})

//注册接口
Router.post("/register",function(req,res){
    const {tel,password,type,yzm} = req.body;//获取请求传递过来的参数

    Yzm.findOne({tel,yzm},function(err,doc){
        if(doc){
            User.findOne({tel},function(err,doc){
                if(doc){
                    return res.json({code:0,msg:"用户已注册"})
                }
                //插入数据
                const userModel = new User({tel,type,password:md5(password)});
                userModel.save(function(err,doc){
                    if(err){
                        return res.json({code:0,msg:"后端出错"})
                    }

                    const { tel,type,_id } = doc;
                    res.cookie("userId",_id)
                    res.cookie("type",type)

                    Yzm.update({tel},{$set:{yzm:''}},function(err,doc){});
                    return res.json({code:1,msg:"注册成功",data:{ tel,type,_id }})
                })
                // User.create({username,type,password:md5(password)},function(err,doc){
                //     if(err){
                //         return res.json({code:0,msg:"后端出错"})
                //     }
        
                //     return res.json({code:1,msg:"注册成功",data:{}})
                // })
            })
        }else{
            return res.json({code:0,msg:"验证码有误"})
        }

        if(err){
            return res.json({code:0,msg:"后端错误"})
        }
    })
})

//查看用户验证码接口
Router.get("/yzmlist",function(req,res){
    Yzm.find({},function(err,doc){
        res.json(doc)
    })
})

//获取验证码接口
Router.post("/yzm",function(req,res){
    const {tel} = req.body;

    Yzm.findOne({tel},function(err,doc){
        if(doc){
            //更新数据
            Yzm.update({tel},{$set:{
                yzm:generateNumbers(6)
            }},function(err,doc){
                if(err){
                    return res.json({code:0,msg:"后端出错"})
                }
                if(doc){
                    Yzm.findOne({tel},function(err,doc){
                        const { yzm } = doc;
                        return res.json({code:1,msg:"获取成功",yzm,time:10})
                    })
                }else{
                    return res.json({code:1,msg:"获取失败"})
                }
            })
        }else{
            //插入数据
            const yzmModel = new Yzm({tel,yzm:generateNumbers(6)});
            yzmModel.save(function(err,doc){
                if(err){
                    return res.json({code:0,msg:"后端出错"})
                }
                if(doc){
                    const { yzm } = doc;
                    return res.json({code:1,msg:"获取成功",yzm,time:10})
                }else{
                    return res.json({code:1,msg:"获取失败"})
                }
            })
        }
    })
   
})

//登录接口
Router.post("/login",function(req,res){
    const {tel,password} = req.body;
  
    User.findOne({tel},function(err,doc){
        if(doc){
            User.findOne({tel,password:md5(password)},_filter,function(err,doc){
                if(doc){
                    res.cookie('userId',doc._id);
                    res.cookie('type',doc.type);

                    return res.json({code:1,msg:"登录成功",data:doc})
                }
                return res.json({code:0,msg:"密码有误"})
            })

            return null;
        }else{
          return res.json({code:0,msg:"账号有误"})
        }
    })
});

//md5 严加密函数
function md5(c){
    const str = 'BFT_ZhaoPin@app_DB';
    c = utility.md5(utility.md5(str+c));
    return c;
}

//取随机数函数
function generateNumbers(len){
    const n = [1,0,5,3,6,4,9,7,8];
    const a = [];
    for(let i = 0;i<len;i++){
        let k = parseInt(Math.random()*n.length)
        a.push(n[k])
        if(a.length===len){
            return parseInt(a.join(""));        
        }
    }
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

        if(doc){
            return res.json({code:1,msg:"获取成功",data:doc})
        }else{
            return res.json({code:0,msg:"获取失败"})
        }
    })
})

//BOSS和牛人完善信息接口
Router.post("/updateInfo",function(req,res){
    const {userId} = req.cookies;
    const data = req.body;
    if(!userId){
        return res.json({code:0})
    }

    User.findByIdAndUpdate(userId,data,function(err,doc){
        if(doc){
            const docData = Object.assign({},{
                tel: doc.tel,
                type: doc.type
            },data)
            return res.json({code:1,msg:"保存成功",docData})
        }else{
            return res.json({code:0,msg:"保存失败"})
        }

        if(err){
            return res.json({code:0,msg:"后端出错"})
        }
    })
})

//获取牛人或Boss列表
Router.post("/list",function(req,res){
    const {type} = req.body;

    User.find({type},function(err,doc){
        if(doc){
            return res.json({code:1,msg:"获取成功",data:doc})
        }else{
            return res.json({code:0,msg:"获取失败"})
        }

        if(err){
            return res.json({code:0,msg:"后端出错"})
        }
    })
})

//读取聊天信息
Router.post("/readMsg",function(req,res){
    const userId = req.cookies.userId;
    const {from} = req.body;
    console.log(userId,from)
    Chat.update({from,to:userId},{"$set":{read:true}},{"multi":true},function(doc,err){
        console.log(doc)
        if(!err){
           return res.json({code:1,msg:"读取成功",num:doc.nModified})
        }

        return res.json({code:0,msg:"读取失败"})
    })
})

//获取聊天列表
Router.post("/getChatList",function(req,res){
    const { userId } = req.cookies;

    User.find({},function(err,doc){
        let avatar = [];
        
        doc.forEach(function(v){
            avatar.push({
                [v._id]:v.avatar,
                title:v.username,
                id:v._id
            });
        })

        Chat.find({"$or":[{"from":userId},{to:userId}]},function(err,doc){
            if(doc){
                res.json({
                    code:1,
                    msg:"获取成功",
                    data:{doc,avatar}
                })
            }else{
                res.json({
                    code:0,
                    msg:"获取失败"
                })
            }
    
            if(err){
                res.json({
                    code:0,
                    msg:"后端出错"
                })
            }
        })
    })
})

module.exports = Router;