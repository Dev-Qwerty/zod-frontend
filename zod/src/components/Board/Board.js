import './Board.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class Board extends React.Component {

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
            <div className="Board">
                
                <div className="b-top-nav">

                    <div className="b-left-wrapper">
                        <div className="b-lt" onClick={ this.backToBaseFn }>
                            <div className="b-arrow"></div>
                            <div><p className="b-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="b-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="b-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="b-right-wrapper">
                        <input type="submit" value="Logout" className="b-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="b-body-wrapper">

                    <div className="b-left-nav">
                        
                        <div className="b-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="b-lng1-wrapper">
                                    <div className="b-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="b-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="b-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="b-lng4" data-tip data-for="calTip"></div>
                            <div className="b-lng5" data-tip data-for="calTip"></div>
                            <div className="b-lng6" data-tip data-for="calTip"></div>
                            <div className="b-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="b-body">
                        
                        <div className="bb-wrapper">
                            
                            <div className="bb-personalB">

                                <p className="bbp-hdn">Personal Boards</p>
                                
                                <div className="bbp-card-wrapper">
                                    
                                    <Link to="/projectdashboard/board/card" style={{ textDecoration: 'none' }}>
                                        <div className="bb-card">
                                            <p className="bbc-parag">Test Board</p>
                                        </div>
                                    </Link>    
                                    
                                    <div className="bb-card">
                                        <p className="bbc-parag">Test Board</p>
                                    </div>   
                                    
                                    <div className="bb-card">
                                        <p className="bbc-parag">Create New Board</p>
                                    </div>                                                               
                                
                                </div>
                            </div>

                            <div className="bb-publicB">
                                
                                <p className="bbP-hdn">Public Boards</p>
                                
                                <div className="bbP-card-wrapper">
                                    
                                    <div className="bb-card">
                                        <p className="bbc-parag">Test Board</p>
                                    </div>
                                    
                                    <div className="bb-card">
                                        <p className="bbc-parag">Test Board</p>
                                    </div>   
                                    
                                    <div className="bb-card">
                                        <p className="bbc-parag">Create New Board</p>
                                    </div>                                                               
                                
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}