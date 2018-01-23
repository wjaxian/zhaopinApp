import axios from "axios";
import {Toast} from "antd-mobile";
import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR = "ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const GETINFO = 'GETINFO';

const initState = {
    redirect:"",
    isLogin:"",
    msg:"",
    username:"",
    type:""
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.data,
                redirect:getRedirectPath(action.data),
                isLogin: true,
                msg: ""
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.data,
                redirect:getRedirectPath(action.data),
                isLogin: true,
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
                msg:action.msg,
                isLogin: false
            }
        default:
            return state
    }
}


//register_success action
export function register_success(data){
    return {
        data,
        type: REGISTER_SUCCESS
    }
}

//login_success action
export function loginSuccess(data){
    return {
        data,
        type: LOGIN_SUCCESS
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

//login action
export function login_handle({username,password}){
    return dispatch=>{
        axios.post("/user/login",{username,password}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(loginSuccess(res.data));
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
export function register({username,password,type}){
    return dispatch => {
        axios.post("/user/register",{username,password,type}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(register_success({username,password,type}));
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