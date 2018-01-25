import axios from "axios";
import {Toast} from "antd-mobile";
import {getRedirectPath} from "../util";

const ERROR = "ERROR";
const UPDATE_INFO_SUCCESS = "UPDATE_INFO_SUCCESS";
const GETINFO = 'GETINFO';

const initState = {
    redirect:"",
    msg:"",
    tel:"",
    type:""
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case UPDATE_INFO_SUCCESS:
            return {
                ...state,
                ...action.data,
                redirect:getRedirectPath(action.data),
                msg: ""
            }
        case GETINFO:
            return {
                ...state,
                ...action.data
            }
        case ERROR:
            return {
                ...state,
                msg:action.msg
            }
        default:
            return state
    }
}

//info action
export function info(data){
    return {
        data,
        type: GETINFO
    }
}

//error action
export function handle_error(msg){
    return {
        msg,
        type: ERROR
    }
}

//get yanzhengma
export function getYzm({tel,callback}){
    return dispatch=>{
        axios.post("/user/yzm",{tel}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    callback(res.yzm,res.time);
                });
            }else{
                Toast.fail(res.msg);
            }
        }).catch(err=>{
            Toast.fail("请求出错");
        })
    }
}

//login action
export function login_handle({tel,password}){
    return dispatch=>{
        axios.post("/user/login",{tel,password}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(updateInfaSuccess(res.data));
                });
            }else{
                Toast.fail(res.msg,2,()=>{
                    dispatch(handle_error(res.msg))
                });
            }
        }).catch(err=>{
            Toast.fail("请求出错",2,()=>{
                dispatch(handle_error("请求出错"))
            });
        })
    }
}

//Register Action
export function register({tel,password,type,yzm}){
    return dispatch => {
        axios.post("/user/register",{tel,password,type,yzm}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(updateInfaSuccess({tel,type}));
                });
            }else{
                Toast.fail(res.msg,2,()=>{
                    dispatch(handle_error(res.msg))
                });
            }
        }).catch(err=>{
            Toast.fail("请求出错",2,()=>{
                dispatch(handle_error("请求出错"))
            });
        })
    }
}

//UPDATE_INFO_SUCCESS action
export function updateInfaSuccess(data){
    return {
        data,
        type:UPDATE_INFO_SUCCESS
    }
}

//updateInfo action
export function updateInfo(data){
    return dispatch=>{
        axios.post("/user/updateInfo",data).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(updateInfaSuccess(data))
                });
            }else{
                Toast.fail(res.msg,2,()=>{
                    dispatch(handle_error(res.msg))
                });
            }
        }).catch(err=>{
            Toast.fail("请求出错",2,()=>{
                dispatch(handle_error("请求出错"))
            });
        })
    }
}