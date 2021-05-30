import './BMain.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import Draggable from 'react-draggable';
import io from 'socket.io-client';

let proData = JSON.parse(localStorage.getItem('pdata'));
const API = 'https://boardservice-zode.herokuapp.com/'+ proData.projectID + '/boards';

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class BMain extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: ''
        }
    }

    componentWillUnmount() {
        
    }

    componentDidMount() {
      
        const socket = io(API, {
            auth: {
                Authorization: localStorage.getItem('token')
            }
        });
        
        socket.on("connection", (data) => {
          //this.socket.emit("joinRoom", room);
        });

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
            <div className="Card">
                
                <div className="c-top-nav">

                    <div className="c-left-wrapper">
                        <div className="c-lt" onClick={ this.backToBaseFn }>
                            <div className="c-arrow"></div>
                            <div><p className="c-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="c-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="c-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="c-right-wrapper">
                        <input type="submit" value="Logout" className="c-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="c-body-wrapper">

                    <div className="c-left-nav">
                        
                        <div className="c-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="c-lng1-wrapper">
                                    <div className="c-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="c-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="c-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="c-lng4" data-tip data-for="calTip"></div>
                            <div className="c-lng5" data-tip data-for="calTip"></div>
                            <div className="c-lng6" data-tip data-for="calTip"></div>
                            <div className="c-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="c-body">
                        
                        <div className="cb-wrapper">

                            <div className="">
                                <input type="submit" value="New List" className="cb-new-list-btn"></input>
                            </div>

                            <div className="cb-list-wrapper">
                                
                                <div className="cb-list">
                                   
                                    <div className="cbl-h">
                                        <div className="cblh-wr">
                                            <div className="cblh-p"><p>Upcomming</p></div>
                                            <div className="cblh-plus"></div>
                                        </div>

                                        <div className="cblh-line"></div>
                                    </div>

                                    <Draggable>  
                                        <div className="dragg">
                                            <div className="cbl-card">
                                                <div className="cblc-taskname">
                                                    <p>Task Name</p>
                                                </div>
                                                <div className="cblc-wr">
                                                    <div className="cblc-profile"><p>JD</p></div>
                                                    <div><p className="cblc-date">20-5-2021</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Draggable>
                                    
                                    <div className="cbl-card">
                                        <div className="cblc-taskname">
                                            <p>Task Name</p>
                                        </div>
                                        <div className="cblc-wr">
                                            <div className="cblc-profile"><p>JD</p></div>
                                            <div><p className="cblc-date">20-5-2021</p></div>
                                        </div>
                                    </div>

                                    <div className="cbl-card">
                                        <div className="cblc-taskname">
                                            <p>Task Name</p>
                                        </div>
                                        <div className="cblc-wr">
                                            <div className="cblc-profile"><p>JD</p></div>
                                            <div><p className="cblc-date">20-5-2021</p></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cb-list">

                                   <div className="cbl-h">
                                        <div className="cblh-wr">
                                            <div className="cblh-p"><p>In Progress</p></div>
                                            <div className="cblh-plus"></div>
                                        </div>

                                        <div className="cblh-line"></div>
                                    </div>

                                    <div className="cbl-card">
                                        <div className="cblc-taskname">
                                            <p>Task Name</p>
                                        </div>
                                        <div className="cblc-wr">
                                            <div className="cblc-profile"><p>JD</p></div>
                                            <div><p className="cblc-date">20-5-2021</p></div>
                                        </div>
                                    </div>
                                    
                                    <div className="cbl-card">
                                        <div className="cblc-taskname">
                                            <p>Task Name</p>
                                        </div>
                                        <div className="cblc-wr">
                                            <div className="cblc-profile"><p>JD</p></div>
                                            <div><p className="cblc-date">20-5-2021</p></div>
                                        </div>
                                    </div>                                  
                                </div>

                                <div className="cb-list">

                                    <div className="cbl-h">
                                        <div className="cblh-wr">
                                            <div className="cblh-p"><p>Completed</p></div>
                                            <div className="cblh-plus"></div>
                                        </div>

                                        <div className="cblh-line"></div>
                                    </div>

                                    <div className="cbl-card">
                                        <div className="cblc-taskname">
                                            <p>Task Name</p>
                                        </div>
                                        <div className="cblc-wr">
                                            <div className="cblc-profile"><p>JD</p></div>
                                            <div><p className="cblc-date">20-5-2021</p></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cb-list">

                                    <div className="cbl-h">
                                        <div className="cblh-wr">
                                            <div className="cblh-p"><p>Frontend</p></div>
                                            <div className="cblh-plus"></div>
                                        </div>

                                        <div className="cblh-line"></div>
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