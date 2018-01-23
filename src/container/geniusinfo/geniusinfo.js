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
  

export default class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            sexVal:["男"]
        }
    }

    render(){
        return (
            <div className="Info">
                <NavBar mode="dark">牛人-完善信息</NavBar>
                <ChooseHeadImage clickHandle={t=>{
                        
                }}></ChooseHeadImage>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <InputItem type="text" placeholder="请输入姓名" className="ta-right">姓名</InputItem>
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
                    <InputItem type="text" placeholder="请输入求职职位">职位</InputItem>
                    <InputItem type="money" placeholder="请输入意向薪资">意向薪资</InputItem>
                    <TextareaItem
                        title="个人简介" 
                        placeholder="请输入个人简介"
                        rows={3} 
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