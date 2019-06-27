import React from "react";
import { connect } from "react-redux";
import { actionUserList } from "../../../redux/list.redux";
import UserCard from "../../../components/user-card/user-card";

@connect(state=>state,{
    actionUserList
})
class Genius extends React.Component{
    
    componentDidMount(){
        this.props.actionUserList("BOSS");
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

export default Genius