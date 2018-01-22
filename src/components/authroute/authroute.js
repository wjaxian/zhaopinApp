import React,{Component} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

@withRouter
export default class AuthRoute extends Component{
    componentDidMount(){
        //需忽略验证的路由
        const pathName = ["/login","/register"];
        let path = this.props.location.pathname;
        if(pathName.indexOf(path)>-1){
            return null
        }

        //获取用户信息
        axios.get("/user/info").then(res=>{
            if(res.code==1){
                console.log("有登录信息");
            }else{
                console.log("没有登录信息");
                this.props.history.push("/login")
            }
        }).catch(err=>{

        })
    }

    render(){
        return null;
    }
}