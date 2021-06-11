import './Calender.css';
import React from 'react';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import firebase from 'firebase';
import refreshToken from '../../functions/refreshToken';
//import loader from '../Loader/Loader'

export default class Calender extends React.Component {

    constructor() {
     
        super();
        this.state = {

        }
    }   
    async componentDidMount() {
                
    }

    componentWillUnmount() {
       
    }

    render() {

        return (

            <div className="Calender">

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

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-chat" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng4" data-tip data-for="calTip">
                                </div>
                            </Link> 
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
                        <p>Hello this is calender!</p> 
                    </div>

                </div>
        
            </div>
        );        
    }
}