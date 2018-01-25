import React from "react";
import { connect } from "react-redux";
import { NavBar } from 'antd-mobile';
import {Route,Switch} from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import Boss from "./boss/boss";
import Genius from "./genius/genius";
import Msg from "./msg/msg";
import User from "./user/user";

@connect(state=>state.user)
export default class Home extends React.Component{

    render(){
        const navList = [
            {
                path:"/genius",
                title:"BOSS列表",
                icon:"job",
                text:"BOSS",
                component: Genius,
                hide: this.props.type==='BOSS'
            },
            {
                path:"/boss",
                title:"牛人列表",
                icon:"boss",
                text:"牛人",
                component: Boss,
                hide: this.props.type==='NIUREN'
            },
            {
                path:"/msg",
                title:"消息列表",
                icon:"m",
                text:"消息",
                component: Msg
            },
            {
                path:"/user",
                title:"个人中心",
                icon:"user",
                text:"我的",
                component: User
            }
        ]

        let pathname = this.props.location.pathname;

        return (
            <div>
                <NavBar
                    mode="dark"
                >
                    {navList.find(v=>v.path===pathname).title}
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