import axios from "axios";
import {Toast} from "antd-mobile";

//请求拦截
axios.interceptors.request.use(function (res){
    Toast.loading("加载中...",0)
    return res;
})

//响应拦截
axios.interceptors.response.use(function (req){
    Toast.hide()
    return req;
})
