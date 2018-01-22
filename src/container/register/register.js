import React,{Component} from "react";
import { Link } from "react-router-dom";
import { List, InputItem, WhiteSpace,Button,WingBlank,Radio,NavBar, Icon,Checkbox,Toast } from 'antd-mobile';
import Logo from "../../components/logo/logo";

export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            isRegister: true,
            info:{
                type: "NIUREN",
                username:"",
                password:"",
                confirmPassword:""
            }
        }
    }

    changeHandle(key,v){
        this.setState({
            ...this.state,
            info:{
                ...this.state.info,
                [key]: v
            }
        })
    }

    xyHandle(v){
        this.setState({
            ...this.state,
            isRegister:v.target.checked
        })
    }

    clickHandle(){
        if(!this.state.isRegister){
            Toast.offline("请勾选服务条款协议")
            return false;
        }else if(!this.state.info.username){
            Toast.fail("请填写用户名");
            return false;
        }else if(!this.state.info.password){
            Toast.fail("请填写密码");
            return false;
        }else if(!this.state.info.confirmPassword){
            Toast.fail("请填写确认密码");
            return false;
        }else if(this.state.info.confirmPassword!==this.state.info.password){
            Toast.fail("两次密码不一致");
            return false;
        }
        console.log(this.state);
    }

    render (){
        const RadioItem = Radio.RadioItem;
        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div>
                {/* <Logo></Logo> */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.push("/login")}
                >注册</NavBar>
                
                <List>
                    <InputItem
                        clear
                        placeholder="请输入用户名"
                        ref={el => this.autoFocusInst = el}
                        onChange={v=>this.changeHandle("username",v)}
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        ref={el => this.customFocusInst = el}
                        type="password" 
                        onChange={v=>this.changeHandle("password",v)}
                    >
                        密码
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="请确认密码"
                        ref={el => this.customFocusInst = el}
                        type="password"
                        onChange={v=>this.changeHandle("confirmPassword",v)}
                    >
                        确认密码
                    </InputItem>
                </List>

                <List renderHeader={() => '请选择职业'}>
                    <RadioItem 
                        checked={this.state.info.type=="NIUREN"} 
                        onChange={v=>this.changeHandle("type","NIUREN")}
                    >牛人</RadioItem>
                    <RadioItem 
                        checked={this.state.info.type=="BOSS"}  
                        onChange={v=>this.changeHandle("type","BOSS")}
                    >BOSS</RadioItem>
                </List>
                <WhiteSpace/>
                <CheckboxItem key="disabled" onChange={v=>this.xyHandle(v)} data-seed="logId" defaultChecked multipleLine>
                    您是否同意服务<Link to="">《条款协议》</Link>
                </CheckboxItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.clickHandle.bind(this)}>注册</Button>
                </WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}