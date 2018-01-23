import React,{Component} from "react";
import { Grid,WhiteSpace } from "antd-mobile";

export default class ChooseHeadImage extends Component{
    constructor(props){
        super(props)
        this.state = {
            icon: require("./images/boy.png"),
            isShow:'none'
        }
    }

    render(){
        const headData = "boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra".split(",").map(s=>{
            return {
                icon: require(`./images/${s}.png`),
                text: `${s}`,
            }
        })

        return (
            <div className="ta-center">
                
                <WhiteSpace/>
                <WhiteSpace/>
                <div onClick={e=>{
                    this.setState({
                        isShow:"block"
                    })
                }}>
                    <div style={{width:56,height:56,display:"inline-block",border:"1px solid #ddd"}}>
                        <img src={this.state.icon} alt="" style={{width:"80%",height:"80%",marginTop:"10%"}}/>
                    </div>
                    <WhiteSpace/>
                    <div style={{fontSize:12}}>选择头像</div>
                </div>
                <WhiteSpace/>
                <div style={{display:this.state.isShow}}>
                    <Grid 
                        data={headData} 
                        activeStyle={false} 
                        columnNum={5}
                        onClick={elm=>{
                            this.setState({icon:elm.icon,isShow:'none'})
                            this.props.clickHandle(elm)
                        }}
                    />
                </div>
                
            </div>
        )
    }
}