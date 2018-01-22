import React,{Component} from "react";
import logoImg from "./images/job.png";
import "./css/logo.css"

export default class Logo extends Component {

    render (){
        return (
            <div className="logo-container">
                <img src={logoImg}/>
            </div>
        )
    }
}