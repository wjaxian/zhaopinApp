import React,{Component} from "react";
import {Link} from "react-router-dom";
import { List, InputItem, WhiteSpace,Button,WingBlank } from 'antd-mobile';
import Logo from "../../components/logo/logo";

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    tarGetRegister(){
        this.props.history.push("/register")
    }

    render (){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List renderHeader={() => ''}>
                        <InputItem
                            clear
                            placeholder="请输入用户名"
                            ref={el => this.autoFocusInst = el}
                        >
                            <i className="iconfont icon-yonghu c-blue"></i>
                        </InputItem>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            ref={el => this.customFocusInst = el}
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
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.tarGetRegister.bind(this)}>注册</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}