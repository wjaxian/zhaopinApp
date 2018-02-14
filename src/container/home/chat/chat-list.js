import React from "react";
import { List,Badge } from "antd-mobile";
import {connect} from "react-redux";
import {dateFtt} from "../../../util";
import {Link} from "react-router-dom";

@connect(state=>state)
export default class ChatList extends React.Component{

    render(){
        // console.log(this.props.chat)
        const userGroup = {};
        this.props.chat.chatMsg.map(v=>{
            userGroup[v.chatId] = userGroup[v.chatId]||[];
            userGroup[v.chatId].push(v);
        })
        
        let data = Object.values(userGroup);
        //分组最新消息排序最上
        data = data.sort((a,b)=>{
            let last_a = data[0][data[0].length-1].create_time;
            let last_b = data[1][data[1].length-1].create_time;
            return last_b - last_a;
        });

        //消息排序
        data[0]&&(data[0] = data[0].sort((a,b)=>a.create_time-b.create_time));
        data[1]&&(data[1] = data[1].sort((a,b)=>a.create_time-b.create_time));

        return (
            <div>
                    {
                        data.map((v,i)=>{
                            // v= v.sort((a,b)=>b.create_time-a.create_time);
                            let id = v[0].from===this.props.user._id?v[0].to:v[0].from;
                            let user = this.props.chat.avatar.filter(n=>n.id===id);
                            let time = Math.max.apply(null,v.map(t=>t.create_time));//取最新时间
                            let unreadNum = v.filter(v=>!v.read&&v.to===this.props.user._id).length;//取未读数量

                            return (
                                <Link to={`/chat/${id}/${user[0].title}`}  key={i}>
                                    <List>
                                        <List.Item 
                                            extra={(
                                                <div>
                                                    <span>{dateFtt("hh:mm",new Date(time))}</span>
                                                    <div>
                                                        <Badge text={unreadNum}></Badge>
                                                    </div>
                                                </div>
                                            )} 
                                            align="top" 
                                            thumb={user[0][id]} 
                                            multipleLine
                                        >
                                            {user[0].title} 
                                            <List.Item.Brief>{v[v.length-1].content}</List.Item.Brief>
                                        </List.Item>
                                    </List>
                                </Link>
                            )
                        
                        })
                    }
            </div>
        )
    }
}