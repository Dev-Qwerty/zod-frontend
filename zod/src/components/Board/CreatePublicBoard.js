import './CreatePublicBoard.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CreatePublicBoard extends React.Component {

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
            <div className="CreatePublicBoard">
                
                <div className="public-cb-top-nav">

                    <div className="public-cb-left-wrapper">
                        <div className="public-cb-lt" onClick={ this.backToBaseFn }>
                            <div className="public-cb-arrow"></div>
                            <div><p className="public-cb-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="public-cb-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="public-cb-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="public-cb-right-wrapper">
                        <input type="submit" value="Logout" className="public-cb-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="public-cb-body-wrapper">

                    <div className="public-cb-left-nav">
                        
                        <div className="public-cb-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng1-wrapper">
                                    <div className="public-cb-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="public-cb-lng4" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng5" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng6" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="public-cb-body">

                        <div className="xcb-proname">
                            <p>Create Public Board</p>
                        </div>

                        <div className="xcb-proLine"></div>

                        <div className="xcb-gridWrx">

                            <div className="xcb-g1">
                                    
                                <p className="xcb-g1-bname-label">Board Name</p>
                                <div><input type="text" placeholder="" className="xcb-g1-bname-inp"></input></div>
                                
                                <p className="xcb-g1-checkbox-hdn">Add Members</p>

                                <div className="xcb-g1-c-wrx">
                                    <div className="xcb-g1-c">
                                        <input type="checkbox" name="xc1" value="" className="xcb-g1-c-box"></input>
                                        <label for="xc1"> alanmatw@gmail.com</label>
                                    </div>
                                    <div className="xcb-g1-c">       
                                        <input type="checkbox" name="xc2" value="" className="xcb-g1-c-box"></input>
                                        <label for="xc2"> albinj12@gmail.com</label>
                                    </div>    
                                    <div className="xcb-g1-c">
                                        <input type="checkbox" name="xc3" value="" className="xcb-g1-c-box"></input>
                                        <label for="xc3"> james@gmail.com</label>
                                    </div>
                                </div>

                                <div><input type="submit" value="Create" className="xcb-g1-submit"></input></div>                                                                             
                            </div>
                            
                            <div className="xcb-g2">
                                <div className="xcb-pic"></div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}