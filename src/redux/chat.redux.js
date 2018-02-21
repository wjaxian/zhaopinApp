import axios from "axios";
import {Toast} from "antd-mobile";
import io from "socket.io-client";

const socket = io("ws://localhost:9093")

const MSG_LIST = "MSG_LIST";//聊天列表
const MSG_RECV = "MSG_RECV";//读取信息
const MSG_READ = "MSG_READ";//标识已读

const initState = {
    chatMsg:[],
    unread:0,
    avatar:''
}

export function chat(state=initState,action){
    switch (action.type){
        case MSG_LIST:
            return {
                ...state,
                chatMsg: action.data.doc,
                unread: action.data.doc.filter(v=>!v.read&&v.to===action.userId).length,
                avatar: action.data.avatar
            }
        case MSG_RECV:
            let num = action.data.to===action.userId?1:0;
            return {
                ...state,
                chatMsg:[...state.chatMsg,action.data],
                unread:state.unread+num
            }
        case MSG_READ:
            return {
                ...state,
                chatMsg:state.chatMsg.map(v=>({...v,read:(action.data.from===v.from?true:false)})),
                unread:state.unread-action.data.num
            }
        default:
            return state;
    }
}

export function getList(data,userId){
    return {
        type:MSG_LIST,
        data,
        userId
    }
}
export function msgRecv(data,userId){
    return {
        type:MSG_RECV,
        data,
        userId
    }
}

function msgRead(data){
    return {
        type:MSG_READ,
        data
    }
}

//更新消息
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on("noticeMsg",function(data){
            let {_id} = getState().user;
            dispatch(msgRecv(data,_id))
        })
    }
}

//读取消息
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post("user/readMsg",{
            from
        }).then(res=>{
            if(res.code===1){
                let userId = getState().user._id;
                dispatch(msgRead({userId,from,num:res.num}))
            }
        }).catch(err=>{

        })
    }
}


//发送消息
export function sendMsg(data){
    return dispatch=>{
        socket.emit("sendMsg",data)
    }
}

//获取聊天信息
export function getChatList(){
    return (dispatch,getState)=>{
        axios.post("/user/getChatList").then(res=>{
            if(res.code===1){
                let {_id} = getState().user;
                dispatch(getList(res.data,_id))
            }else{
                Toast.msg(res.msg)
            }
        }).catch(err=>{

        })
    }
}