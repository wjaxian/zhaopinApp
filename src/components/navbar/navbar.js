import React from "react";
import {TabBar} from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";

@withRouter
@connect(state=>state.chat)
export default class Navbar extends React.Component{
    static proptypes = {
        data: PropTypes.array.isReuired
    }

    render(){
        const data = this.props.data.filter(v=>!v.hide);

        return (
            <TabBar>
                {
                    data.map(v=>{
                        return <TabBar.Item
                                    title={v.text}
                                    key={v.path}
                                    badge={v.path==="/chat"?this.props.unread:0}
                                    icon={{uri:require(`./images/${v.icon}.png`)}}
                                    selectedIcon={{uri:require(`./images/${v.icon}-active.png`)}}
                                    selected={this.props.location.pathname===v.path}
                                    onPress={() => {
                                        this.props.history.push(v.path)
                                    }}
                                >
                                </TabBar.Item>
                    })
                }
            </TabBar>
        )
    }
}