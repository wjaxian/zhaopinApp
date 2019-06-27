import React from "react";
import { connect } from "react-redux";
import { NavBar } from 'antd-mobile';
import {Route,Switch} from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import {getChatList,recvMsg} from "../../redux/chat.redux";

import Boss from "./boss/boss";
import Genius from "./genius/genius";
import ChatList from "./chat/chat-list";
import User from "./user/user";

@connect(state=>state,{
    getChatList,recvMsg
})
class Home extends React.Component{
    componentDidMount(){
        
        if(!this.props.chat.chatMsg.length){
            this.props.getChatList();
            this.props.recvMsg();
        }
    }

    render(){
        const navList = [
            {
                path:"/genius",
                title:"BOSS列表",
                icon:"job",
                text:"BOSS",
                component: Genius,
                hide: this.props.user.type==='BOSS'
            },
            {
                path:"/boss",
                title:"牛人列表",
                icon:"boss",
                text:"牛人",
                component: Boss,
                hide: this.props.user.type==='NIUREN'
            },
            {
                path:"/chat",
                title:"消息列表",
                icon:"m",
                text:"消息",
                component: ChatList
            },
            {
                path:"/user",
                title:"个人中心",
                icon:"user",
                text:"我的",
                component: User
            }
        ]

        let pathname = this.props.location.pathname,
            navItem = navList.find(v => v.path === pathname);

        return (
            <div>
                <NavBar mode="dark">
                    {navItem && navItem.title}
                </NavBar>

                <div className="mt-45 mb-50">
                    <Switch>
                        {navList.map(v=><Route path={v.path} component={v.component} key={v.path}/>)}
                    </Switch>
                </div>

                <Navbar data={navList}></Navbar>
            </div>
        )
    }
}

export default Home