import { Link, Route } from 'react-router-dom';
import './ChatHome.css';
import ChannelIcon from '../../assets/channel-icon.svg';
import DynamicChatDisplay from './DynamicChatDisplay';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";

function ChatHome() {
    let [activeComponent, setActiveComponent] = useState('default'); 
    let [channelNames, setChannelName] = useState([]);
    let projectDetails = JSON.parse(localStorage.getItem('pdata'));
    function fetchChannels() {
        let projectData = JSON.parse(localStorage.getItem("pdata"));
        let url = "https://zode-chat-service-test.herokuapp.com/api/channel/" + projectData.projectID;
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            setChannelName(response.data);
        })
    }
    useEffect(() => {
        fetchChannels();
    }, []);

    return(
        <div className="zod-chat-homepg">
        <div className="bd-top-nav">
                <div className="bd-left-wrapper">
                    <p className="bd-title">zode</p>
                </div>
    
            <div className="bd-right-wrapper">
                <div className="bd-profile-icon-wrapper">
                    <div className="bd-icon-1">
                        <p className="bd-icon-txt">JD</p> 
                    </div>
    
                    <div className="bd-dropdown-content-1">
                        <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>My Profile</p></Link>
                        <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="ch-left-nav">
                        
            <div className="pd-left-nav-grid">
                <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                    <div className="ch-lng1-wrapper">
                        <div className="ch-lng1" data-tip data-for="homeTip"></div>
                    </div>
                </Link> 
                <Link to="/projectdashboard/board" style={{ textDecoration: 'none' }}>
                    <div className="pd-lng2" data-tip data-for="boardTip"></div>
                </Link>
                <Link to="/chat/home" style={{ textDecoration: 'none' }}><div className="ch-lng3" data-tip data-for="chatTip"></div></Link>
                <div className="pd-lng4"></div>
                <div className="pd-lng5"></div>
                <div className="pd-lng6"></div>
                <div className="pd-lng7"></div>
                <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>            
            </div>
        </div>
        <div className="ch-leftnav-2">
            <h2 className="ch-project-title">{projectDetails.projectName}</h2>
            <hr></hr>
            <h3>Channels</h3>
            <div className="ch-channels-list">
                {channelNames.map((channel, index) => <button onClick={() => {setActiveComponent(channel.channelName)}}>@{channel.channelName}</button>)}
            </div>
        </div>
        <div className="ch-chat-display">
            <DynamicChatDisplay projectname={projectDetails.projectName} channelname={activeComponent}/>
        </div>
    </div>
    )
}

export default ChatHome;