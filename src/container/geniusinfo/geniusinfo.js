import React,{Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import { NavBar,InputItem,TextareaItem,Button,WingBlank,WhiteSpace,Picker,List,Toast } from "antd-mobile";
import ChooseHeadImage from "../../components/choose-head-image/choose-head-image";
import {updateInfo} from "../../redux/user.redux";

const seasons = [
    {
        label: '男',
        value: '男',
    },
    {
        label: '女',
        value: '女',
    },
];
  
@connect(state=>state.user,{
    updateInfo
})
export default class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            sex:["男"],
            username:"",
            age:"",
            avatar:"",
            title:"",
            money:"",
            desc:"",
            type:"NIUREN"
        }
    }

    changeHandle(key,v){
        this.setState({
            ...this.state,
            [key]: v
        })
    }

    saveHandle(){
        const info = Object.values(this.state);
        for(let i =0;i<info.length;i++){
            if(!info[i]){
                Toast.fail("信息不完整")
                return false;
            }
        }

        this.props.updateInfo(this.state);
    }

    render(){
        let redirect = this.props.redirect;
        let path = this.props.location.pathname;

        return (
            <div className="Info mt-45">
                {redirect&&redirect!==path?<Redirect to={redirect}></Redirect>:null}
                <NavBar mode="dark">牛人-完善信息</NavBar>
                <ChooseHeadImage clickHandle={t=>{
                    this.setState({
                        ...this.state,
                        avatar: t.icon
                    })
                }}></ChooseHeadImage>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                <InputItem 
                        type="text" 
                        placeholder="请输入您的姓名" 
                        className="ta-right"
                        onChange={v => this.changeHandle("username",v)}
                    >姓名</InputItem>
                    <InputItem 
                        type="number" 
                        placeholder="请输入您的年龄" 
                        className="ta-right"
                        onChange={v => this.changeHandle("age",v)}
                    >年龄</InputItem>
                    <Picker
                        title="选择性别"
                        extra="请选择"
                        cols={1}
                        data={seasons}
                        value={this.state.sex}
                        onChange={v => this.changeHandle("sex",v)}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <InputItem 
                        type="text" 
                        placeholder="请输入求职职位"
                        onChange={v => this.changeHandle("title",v)}
                    >职位</InputItem>
                    <InputItem 
                        type="text" 
                        placeholder="请输入意向薪资"
                        onChange={v=> this.changeHandle("money",v)}
                    >意向薪资</InputItem>
                    <TextareaItem
                        title="个人简介" 
                        placeholder="请输入个人简介"
                        rows={3} 
                        autoHeight
                        onChange={v => this.changeHandle("desc",v)}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.saveHandle.bind(this)}>保存信息</Button>
                </WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}