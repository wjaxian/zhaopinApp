import React,{Component} from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register,getYzm } from "../../redux/user.redux";
import { List, InputItem, WhiteSpace,Button,WingBlank,Radio,NavBar, Icon,Checkbox,Toast,Modal } from 'antd-mobile';
import {yzTel} from "../../util";

@connect(state=>state.user,{
    register,getYzm
})
class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            isRegister: true,
            ctype:"",
            time:"",
            btnVL:"获取",
            currentT:"",
            info:{
                type: "NIUREN",
                tel:"",
                yzm:"",
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
        }else if(!this.state.info.tel){
            Toast.fail("请填写手机号");
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

        this.props.register(this.state.info)
    }

    getYzm(type){
        
        if(!this.state.info.tel){
            Toast.fail("请填写手机号");
            return false;
        }else if(!yzTel(this.state.info.tel)){
            Toast.fail("您输入的手机号有误");
            return false;
        }

        if(type===''){
            this.props.getYzm({
                tel:this.state.info.tel,
                callback:(yzm,t)=>{
                    const ts = s =>{
                        this.setState({
                            ...this.state,
                            ctype:"see",
                            currentT:s,
                            btnVL:"查验证码",
                            info:{
                                ...this.state.info,
                                yzm
                            }
                        });

                        setTimeout(()=>{
                            --s
                            if(s<1){
                                this.setState({
                                    ...this.state,
                                    ctype:"",
                                    time:s,
                                    currentT:"",
                                    btnVL:"重新获取",
                                    info:{
                                        ...this.state.info
                                    }
                                })
                            }else{
                                ts(s)
                            }
                        },1000)
                    }

                    ts(t)
                }
            })
        }else if(type==='see'){
            Modal.alert("验证码", (
                <div>{this.state.info.yzm}<div>下次获取还剩{this.state.currentT}s</div></div>
            ))
        }
    }

    render (){
        const RadioItem = Radio.RadioItem;
        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div className="register mt-45">
                {this.props.redirect?<Redirect to={this.props.redirect}></Redirect>:null}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.push("/login")}
                >注册</NavBar>
                
                <List>
                    <InputItem
                        clear
                        placeholder="请输入手机号"
                        type="number"
                        moneyKeyboardAlign="left"
                        ref={el => this.autoFocusInst = el}
                        onChange={v=>this.changeHandle("tel",v)}
                    >
                        手机号
                    </InputItem>
                    <div style={{width:"69%",display:"inline-block"}}>
                        <InputItem
                            clear
                            placeholder="请输入验证码"
                            type="number"
                            ref={el => this.autoFocusInst = el}
                            onChange={v=>this.changeHandle("yzm",v)}
                            maxLength={6}
                        >验证码
                        </InputItem>
                    </div>
                    <div style={{width:"28%",display:"inline-block",verticalAlign:"middle",borderBottom:"1px solid #eee",height:36,paddingRight:"2%"}}>
                        <Button 
                            type="primary" 
                            size="small" 
                            disabled={this.state.isYzm} 
                            style={{marginTop:0}}
                            onClick={()=>{this.getYzm(this.state.ctype)}}
                        >{this.state.btnVL}</Button>
                    </div>
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
                        checked={this.state.info.type==="NIUREN"} 
                        onChange={v=>this.changeHandle("type","NIUREN")}
                    >牛人</RadioItem>
                    <RadioItem 
                        checked={this.state.info.type==="BOSS"}  
                        onChange={v=>this.changeHandle("type","BOSS")}
                    >BOSS</RadioItem>
                </List>
                <WhiteSpace/>
                <CheckboxItem key="disabled" onChange={v=>this.xyHandle(v)} data-seed="logId" defaultChecked multipleLine>
                    请勾选<Link to="">《服务条款协议》</Link>
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

export default Register