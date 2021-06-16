import './Cal.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
//import Calx from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
//import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios';
import firebase from 'firebase';
import refreshToken from '../../functions/refreshToken';
//import loader from '../Loader/Loader'

function Cal() {

    const localizer = momentLocalizer(moment)
    localizer.formats.yearHeaderFormat = 'YYYY'


    /*const [dateState, setDateState] = useState(new Date())
    
    const changeDate = (e) => {
      setDateState(e)
    }*/

    const backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }
    
    const logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    const getProfileImageURL = () => {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    return (

        <div className="Calender">

            <div className="pd-top-nav">

                <div className="pd-left-wrapper">
                    <div className="pd-lb"><p className="pd-title" onClick={ backToBaseFn.bind(this) }>zode</p></div>
                </div>

                <div className="pd-mid-wrapper">
                    <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                </div>

               <div className="bd-right-wrapper">
    
                        <div className="bd-profile-icon-wrapper">
    
                            <div>
                                <img className="bd-icon" src = { getProfileImageURL() }/>
                            </div>
    
                            <div className="bd-dropdown-content">
                                <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>Profile</p></Link>
                                <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                                <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                            </div>
                        </div>
                    </div>

            </div>               

            <div className="pd-body-wrapper">

                <div className="pd-left-nav">
                    
                    <div className="pd-left-nav-grid">
                        
                        <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                            <div className="cal-lng1-wrapper">
                                <div className="cal-lng1" data-tip data-for="homeTip"></div>
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
                            <div className="cal-lng4" data-tip data-for="calTip">
                            </div>
                        </Link> 

                        <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                            <div className="pd-lng5" data-tip data-for="videoCallTip"></div>
                        </Link>
                        <div className="pd-lng6" data-tip data-for="noneTip"></div>
                        <div className="pd-lng7" data-tip data-for="noneTip"></div>

                        <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                        <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                        <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                        <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                        <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet / Video Call</ReactTooltip>
                        <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>     

                    </div>
                </div>
                
                <div className="pd-body">
                    
                    <div className="cal-wrapper">
                    
                        {/*<Calx
                            value={dateState}
                            onChange={changeDate}
                        />
                        <p className="cal-p">Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>*/}

                        <Calendar
                            localizer={localizer}
                            events={[]}
                            toolbar={true}
                            views={{
                                day: true,
                                week: true,
                                month: true,
                            }}
                        />

                    </div>

                </div>

            </div>
    
        </div>
    );      

}

export default Cal;