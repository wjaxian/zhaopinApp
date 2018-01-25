import React from "react";
import { Card,WhiteSpace,Button } from 'antd-mobile';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionUserList } from "../../../redux/list.redux";

@connect(state=>state,{
    actionUserList
})
export default class Boss extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.actionUserList("NIUREN");
    }

    render(){
        const data = this.props.listData.lists;
        
        return (
            <div>
                {
                    data.map(v=>{
                        return (
                            <div key={v._id}>
                                <Card>
                                    <Card.Header
                                        title={v.username}
                                        thumb={v.avatar}
                                        extra={<span>求职-{v.title}</span>}
                                    />
                                    <Card.Body>
                                        <div className="over-2">{v.desc}</div>
                                    </Card.Body>
                                    <Card.Footer content="" extra={
                                        <div>{v.money}</div>
                                    } />
                                </Card>
                                <WhiteSpace/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}