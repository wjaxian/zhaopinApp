const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./userRoute");
const app = express();

//express & socket.io关联
const server = require("http").Server(app);
const io = require("socket.io")(server);
const models = require("./model");
const Chat = models.getModel("chat");//聊天表

io.on("connection",function(socket){
    //收到前端发送过来的消息
    socket.on("sendMsg",function(data){
        const {from,to,content} = data;
        const chatId = [from,to].sort().join("_");
        Chat.create({chatId,...data},function(err,doc){
            if(doc){
                io.emit("noticeMsg",doc)
            }
        })
        //发送到全局
        // io.emit("noticeMsg",data)
    })
})

app.use(cookieParser());
app.use(bodyParser.json());

// 用户接口模块
app.use("/user",userRoute);

// app.get("/",function(req,res){
//     res.send("wellcom to express!")
// });

server.listen("9093",function(){
    console.log("open Browser http://localhost:9093");
});


// app.use  使用模块
// app.get   app.post 分别开发get和 post接口
// res.send  返回文本   res.json  返回对象   res.sendfile 返回文件  / 分别用来响应不同内容


