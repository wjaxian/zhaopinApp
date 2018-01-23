import React,{Component} from "react";
import { NavBar,InputItem,TextareaItem,Button,WingBlank,WhiteSpace,Picker,List } from "antd-mobile";
import ChooseHeadImage from "../../components/choose-head-image/choose-head-image";

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

export default class BossInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            sexVal:["男"]
        }
    }

    render(){
        return (
            <div className="Info">
                <NavBar mode="dark">BOSS-完善信息</NavBar>
                <ChooseHeadImage clickHandle={t=>{

                }}></ChooseHeadImage>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <ChooseHeadImage></ChooseHeadImage>
                    <InputItem type="text" placeholder="请输入公司名称" className="ta-right">公司名称</InputItem>
                    <Picker
                        title="选择性别"
                        extra="请选择"
                        cols={1}
                        data={seasons}
                        value={this.state.sexVal}
                        onChange={v => this.setState({ sexVal: v })}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <InputItem type="text" placeholder="请输入招聘职位">招聘职位</InputItem>
                    <InputItem type="money" placeholder="请输入职位薪资">职位薪资</InputItem>
                    <TextareaItem
                        title="职位简介" 
                        placeholder="请输入职位简介"
                        rows={5} 
                        autoHeight
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary">保存信息</Button>
                </WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}