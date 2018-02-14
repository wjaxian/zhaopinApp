import React from "react";
import { Card,WhiteSpace,Flex } from 'antd-mobile';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";

@withRouter
@connect(state=>state.user)
export default class UserCard extends React.Component{
    static propTypes = {
        userLists: PropTypes.array.isRequired
    }

    clickHandle(v){
        this.props.history.push(`/chat/${v._id}/${v.username}`)
    }

    render(){
        const data = this.props.userLists;

        return (
            <div>
                {
                    data.map(v=>{
                        return (
                            <div key={v._id} onClick={()=>{this.clickHandle(v)}}>
                                <Card>
                                    <Card.Header
                                        title={v.username}
                                        thumb={v.avatar}
                                        extra={<span>{v.title}</span>}
                                    />
                                    <Card.Body>
                                        {
                                            this.props.type==="NIUREN"?(
                                                <div className="flex-container">
                                                    <Flex>
                                                        <Flex.Item>公司：{v.company}</Flex.Item>
                                                        <Flex.Item className="ta-right">薪资：{v.money}</Flex.Item>
                                                    </Flex>
                                                    <WhiteSpace/>
                                                </div>
                                            ):null
                                        }
                                        
                                        <div className="over-2">{v.desc}</div>
                                    </Card.Body>
                                    <Card.Footer content="" extra={
                                        <div></div>
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