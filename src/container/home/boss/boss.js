import React from "react";
import { connect } from "react-redux";
import { actionUserList } from "../../../redux/list.redux";
import UserCard from "../../../components/user-card/user-card";

@connect(state=>state,{
    actionUserList
})
export default class Boss extends React.Component{

    componentDidMount(){
        this.props.actionUserList("NIUREN");
    }

    render(){
        const data = this.props.listData.lists;
        
        return (
            <div>
                <UserCard userLists={data}></UserCard>
            </div>
        )
    }
}