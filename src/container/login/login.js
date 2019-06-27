import React,{Component} from "react";
import {Link,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { login_handle } from "../../redux/user.redux";
import { List, InputItem, WhiteSpace,Button,WingBlank,Toast } from 'antd-mobile';
import Logo from "../../components/logo/logo";

@connect(state=>state.user,{
    login_handle
})
class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            tel:"",
            password:""
        }
    }

    tarGetRegister(){
        this.props.history.push("/register")
    }

    changeHandle(key,v){
        this.setState({
            ...this.state,
            [key]:v
        });
    }

    clickHandle(){
        if(!this.state.tel){
            Toast.fail("请输入用户名")
            return false;
        }else if(!this.state.password){
            Toast.fail("请输入密码")
            return false;
        }

        this.props.login_handle(this.state)
    }

    render (){
        
        return (
            <div>
                {this.props.redirect&&this.props.match.path!==this.props.redirect?<Redirect to={this.props.redirect}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    <List renderHeader={() => ''}>
                        <InputItem
                            clear
                            placeholder="请输入用户名"
                            ref={el => this.autoFocusInst = el}
                            onChange={v=>this.changeHandle("tel",v)}
                        >
                            <i className="iconfont icon-yonghu c-blue"></i>
                        </InputItem>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            type="password"
                            ref={el => this.customFocusInst = el}
                            onChange={v=>this.changeHandle("password",v)}
                        >
                            <i className="iconfont icon-mima c-blue" style={{fontSize:"19px"}}></i>
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <div className="ta-right">
                        <Link to="">忘记密码？</Link>
                    </div>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.clickHandle.bind(this)}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.tarGetRegister.bind(this)}>注册</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}

export default Login