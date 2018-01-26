import React,{Component} from "react";
import PropTypes from "prop-types";
import { Grid,WhiteSpace } from "antd-mobile";

export default class ChooseHeadImage extends Component{
    static propTypes = {
        clickHandle: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            icon: "",
            isShow:'none'
        }
    }

    componentWillMount(){
        if(this.props.icon_path){
            this.setState({
                ...this.state,
                icon: this.props.icon_path
            })
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
                <div>
                    <div style={{width:56,height:56,display:"inline-block",border:"1px solid #ddd"}}  onClick={e=>{
                    this.setState({
                        isShow:"block"
                    })
                }}>
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