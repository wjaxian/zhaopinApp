import React from "react";
import { Card,WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux";
import { actionUserList } from "../../../redux/list.redux";

@connect(state=>state,{
    actionUserList
})
export default class Genius extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.actionUserList("BOSS");
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
                                        extra={<span>招聘-{v.title}</span>}
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