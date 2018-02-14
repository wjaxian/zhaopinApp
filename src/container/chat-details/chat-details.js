import React from "react";
import {connect} from "react-redux";
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import {sendMsg,getChatList,readMsg,recvMsg} from "../../redux/chat.redux";
import {dateFtt} from "../../util";
// import io from "socket.io-client";
// const socket = io("ws://localhost:9093");

@connect(state=>state,{
    sendMsg,getChatList,readMsg,recvMsg
})
export default class ChatDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            val: "",
            isEmoji:false,
            msg:[]
        }
    }

    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getChatList();
            // this.props.recvMsg()
        }

       
        //接受消息
        // socket.on("noticeMsg",data=>{
        //     this.setState({
        //         msg: [...this.state.msg,data.val]
        //     })
        // })
    }

    componentWillUnmount(){
        this.props.readMsg(this.props.match.params.id)
    }

    fixCarousel(){
        setTimeout(()=>{
            window.dispatchEvent(new Event("resize"))
        },0)
    }

    sendHandle(){
        //发送消息
        // socket.emit("sendMsg",{...this.state})
        const from = this.props.user._id;
        const to = this.props.match.params.id;
        let content = this.state.val;
        this.props.sendMsg({from,to,content});

        this.setState({
            val:""
        });
    }

    send(e){
        if(e.keyCode===13){
            this.sendHandle();
        }
    }

    render(){
        const emoji = '😀 😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😐 😑 😒 😓 😔 😕 😖 😗 😘 😙 😚 😛 😜 😝 😞 😟 😠 😡 😢 😣 😤 😥 😦 😧 😨 😩 😪 😫 😬 😭 😮 😯 😰 😱 😲 😳 😴 😵 😶 😷 😸 😹 😺 😻 😼 😽 😾 😿 🙀 🙅 🙆 🙇 🙈 🙉 🙊 🙋 🙌 🙍 🙎 🙏 🚀 🚁 🚂 🚃 🚄 🚅 🚆 🚇 🚈 🚉 🚊 🚋 🚌 🚍 🚎 🚏 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚙 🚚 🚛 🚜 🚝 🚞 🚟 🚠 🚡 🚢 🚣 🚤 🚥 🚦 🚧 🚨 🚩 🚪 🚫 🚬 🚭 🚮 🚯 🚰 🚱 🚲 🚳 🚴 🚵 🚶 🚷 🚸 🚹 🚺 🚻 🚼 🚽 🚾 🚿 🛀 🛁 🛂 🛃 🛄 🛅'.split(" ").filter(v=>v).map(v=>({text:v}));

        let cid = [this.props.user._id,this.props.match.params.id].sort().join("_");
        const chatList = this.props.chat.chatMsg.filter(v=>v.chatId===cid).sort((a,b)=>a.create_time-b.create_time);

        return (
            <div>
                 <NavBar 
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >{this.props.match.params.name}</NavBar>
                <div 
                    style={{padding:"60px 5%",paddingTop:35}}
                    ref="msgBox"
                >
                    {
                        chatList.map(v=>{
                            return v.from===this.props.user._id?(
                                <div key={v._id} className="clearfix chat-txt">
                                    <p className="ta-center">{dateFtt("yyyy-MM-dd hh:mm",new Date(v.create_time))}</p>
                                    <div style={{float:"right"}}>
                                        <div className="chat-head" style={{float:"right"}}>
                                            <img src={this.props.user.avatar} alt=""/>
                                        </div>
                                        <div className="chat-foot" style={{float:"left"}}>{v.content}</div>
                                    </div>
                                </div>
                            ):(
                                <div key={v._id} className="clearfix chat-txt">
                                    <p className="ta-center">{dateFtt("yyyy-MM-dd hh:mm",new Date(v.create_time))}</p>
                                    <div  style={{float:"left"}}>
                                        <div className="chat-head" style={{float:"left"}}>
                                            <img 
                                                src={ 
                                                    this.props.chat.avatar.map(v=>v[this.props.match.params.id]).filter(v=>v)
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="chat-foot" style={{float:"right",marginLeft:15}}>{v.content}</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="chat-footer">
                        <List>
                            <InputItem 
                                type="text"
                                value={this.state.val}
                                extra={
                                    <span 
                                        className="send-btn"
                                        onClick={()=>{
                                            this.setState({
                                                ...this.state,
                                                isEmoji:!this.state.isEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😀</span>
                                    // <span 
                                    //     className="send-btn"
                                    //     onClick={this.sendHandle.bind(this)}
                                    // >发送</span>
                                }
                                onChange={
                                    v=>this.setState({val:v})
                                }
                                onKeyUp={e=>{
                                    this.send(e)
                                }}
                            ></InputItem>
                        </List>
                        {
                            this.state.isEmoji?(
                                <Grid 
                                    data={emoji} 
                                    isCarousel
                                    columnNum={8}
                                    carouselMaxRow={4}
                                    hasLine={false} 
                                    onClick={_el => this.setState({
                                        ...this.state,
                                        val:this.state.val+_el.text,
                                        isEmoji:!this.state.isEmoji
                                    })} 
                                />
                            ):null
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}