import axios from "axios";
import { Toast } from "antd-mobile";

const LIST_SUCCESS = "LIST_SUCCESS";

const initState = {
    lists:[]
}

//reducer
export function listData(state=initState,action){
    switch(action.type){
        case LIST_SUCCESS:
            return {
                ...state,
                lists: action.data
            }
        default:
            return state;
    }
}

//action
export function userList(data){
    return {
        data,
        type:LIST_SUCCESS
    }
}

//异步action触发请求
export function actionUserList(type){
    return dispatch=>{
        axios.post("/user/list",{type}).then(res=>{
            if(res.code===1){
                //同步action变动store数据
                dispatch(userList(res.data))
            }else{
                Toast.fail(res.msg)
            }
        }).catch(err=>{
            Toast.fail("请求出错")
        })
    }
}