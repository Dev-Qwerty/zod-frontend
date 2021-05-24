import './CreatePersonalBoard.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CreatePersonalBoard extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: ''
        }
    }

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    render() {
    
        return (
            <div className="CreateBoard">
                
                <div className="personal-cb-top-nav">

                    <div className="personal-cb-left-wrapper">
                        <div className="personal-cb-lt" onClick={ this.backToBaseFn }>
                            <div className="personal-cb-arrow"></div>
                            <div><p className="personal-cb-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="personal-cb-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="personal-cb-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="personal-cb-right-wrapper">
                        <input type="submit" value="Logout" className="personal-cb-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="personal-cb-body-wrapper">

                    <div className="personal-cb-left-nav">
                        
                        <div className="personal-cb-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng1-wrapper">
                                    <div className="personal-cb-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="personal-cb-lng4" data-tip data-for="calTip"></div>
                            <div className="personal-cb-lng5" data-tip data-for="calTip"></div>
                            <div className="personal-cb-lng6" data-tip data-for="calTip"></div>
                            <div className="personal-cb-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="personal-cb-body">

                        <div className="pcb-proname">
                            <p>Create Personal Board</p>
                        </div>

                        <div className="pcb-proLine"></div>

                        <div className="pcb-gridWrx">
                            
                            <div className="pcb-g1">
                                
                                <p className="pcb-g1-bname-label">Board Name</p>
                                <div><input type="text" placeholder="" className="pcb-g1-bname-inp"></input></div>
                                <div><input type="submit" value="Create" className="pcb-g1-submit"></input></div>                                                                             
                            </div>

                            <div className="pcb-g2">
                                <div className="pcb-pic"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}