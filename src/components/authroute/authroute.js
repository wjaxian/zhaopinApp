import {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { info } from "../../redux/user.redux";

@withRouter
@connect(null,{
    info
})
class AuthRoute extends Component{
    componentDidMount(){
        //需忽略验证的路由
        const pathName = ["/login","/register"];
        let path = this.props.location.pathname;
        if(pathName.indexOf(path)>-1){
            return null
        }

        //获取用户信息
        axios.get("/user/info").then(res=>{
            if(res.code===1){
                this.props.info(res.data);
            }else{
                this.props.history.push("/login")
            }
        }).catch(err=>{

        })
    }

    render(){
        return null;
    }
}

export default AuthRoute