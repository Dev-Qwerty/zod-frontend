import './ProjectD.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
 
/* 
    HOME

    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class ProjectD extends React.Component {

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
            <div className="ProjectD">
                
                <div className="pd-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lt" onClick={ this.backToBaseFn }>
                            <div className="pd-arrow"></div>
                            <div><p className="pd-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="pd-lb"><p className="pd-title">zode</p></div>
                    </div>
    
                    <div className="pd-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="pd-right-wrapper">
                        <input type="submit" value="Logout" className="pd-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="pd-body-wrapper">

                    <div className="pd-left-nav">
                        
                        <div className="pd-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng1-wrapper">
                                    <div className="pd-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="pd-chat" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="pd-lng4" data-tip data-for="calTip"></div>
                            <div className="pd-lng5" data-tip data-for="calTip"></div>
                            <div className="pd-lng6" data-tip data-for="calTip"></div>
                            <div className="pd-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">

                            <div className="pdb-hdn-left">
                                <div className="pdb-hl-1"><p>Final Year Project&nbsp;🚀</p></div>
                                <div className="pdb-hl-2"><p>Team Lead: <span className="wrx">John Doe</span></p></div>
                            </div>

                            <div className="pdb-hdn-right">
                                <div className="pdb-hr-1"><p>Due By: 30-June-2021</p></div>
                            </div>
                        </div>

                        <div className="pdb-milestones">
                            
                            <p className="pdbm-hdn">Milestones</p>
                            <div className="pdbm-list">

                                <div className="pdbm-list-item1">

                                    <div className="pdbm-dot"></div>
                                    <div className="pdbm-task">
                                        <p>Complete Project Service</p>
                                    </div>
                                    <div className="pdbm-status">
                                        <p>Completed</p>
                                    </div>
                                    <div className="pdbm-name">
                                        <p>John Doe</p>
                                    </div>
                                    <div className="pdbm-date">
                                        <p>12-April-2021</p>
                                    </div>                                                                        
                                </div>

                                <div className="pdbm-list-item1">

                                    <div className="pdbm-dot"></div>
                                    <div className="pdbm-task">
                                        <p>Complete Project Service</p>
                                    </div>
                                    <div className="pdbm-status">
                                        <p>Completed</p>
                                    </div>
                                    <div className="pdbm-name">
                                        <p>John Doe</p>
                                    </div>
                                    <div className="pdbm-date">
                                        <p>12-April-2021</p>
                                    </div>                                                                        
                                </div>

                                <div className="pdbm-list-item1">

                                    <div className="pdbm-dot"></div>
                                    <div className="pdbm-task">
                                        <p>Complete Project Service</p>
                                    </div>
                                    <div className="pdbm-status">
                                        <p>Completed</p>
                                    </div>
                                    <div className="pdbm-name">
                                        <p>John Doe</p>
                                    </div>
                                    <div className="pdbm-date">
                                        <p>12-April-2021</p>
                                    </div>                                                                        
                                </div>

                                <div className="pdbm-list-item1">

                                    <div className="pdbm-dot"></div>
                                    <div className="pdbm-task">
                                        <p>Complete Project Service</p>
                                    </div>
                                    <div className="pdbm-status">
                                        <p>Completed</p>
                                    </div>
                                    <div className="pdbm-name">
                                        <p>John Doe</p>
                                    </div>
                                    <div className="pdbm-date">
                                        <p>12-April-2021</p>
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