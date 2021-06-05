import { Link, Route } from 'react-router-dom';
import './ChatHome.css';

import DynamicChatDisplay from './DynamicChatDisplay';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import refreshToken from '../../functions/refreshToken';
import {toast} from 'react-toastify';
import socketIOClient from 'socket.io-client';
let projectDetails = JSON.parse(localStorage.getItem('pdata'));
let ENDPOINT;
if(projectDetails) {
ENDPOINT = 'https://chatservice-zode.herokuapp.com/'+ projectDetails.projectID + "/chat";
}
toast.configure()

function ChatHome() {
    let [activeComponent, setActiveComponent] = useState('default'); 
    let [channelNames, setChannelName] = useState([]);
    let [channelMembers, setChannelMembers] = useState([]);
    let [activeChannelId, setActiveChannelId] = useState('');
    const [response, setResponse] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    //const socket = socketIOClient(ENDPOINT, {auth: {Authorization: localStorage.getItem('token')}});
    
    function fetchChannels() {
        let url = "https://chatservice-zode.herokuapp.com/api/channel/" + projectDetails.projectID;
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            setChannelName(response.data);
        }).catch(error => {
            if(error.response.status === 401) {
                refreshToken();
                toast.error("Session expired! Reloading....", {position: "bottom-right"});
                setTimeout(() => {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/chat/home';
                }, 2500);
            }
        })
    }

    function chatHomeCallback(channelId) {
        let i;
        for(i=0;i<channelNames.length; i++) {
            if(channelNames[i].channelid == channelId) {
                break;
            }
        }
        let channelDisplay = document.getElementById("channel"+i);
        if(channelDisplay!=null) {
            channelDisplay.style.fontWeight = "bold";
        } 
    }
    
    function channelClicked(channel, index) {
        setActiveComponent(channel.channelName); 
        setActiveChannelId(channel.channelid);
        let displayValue = document.getElementById("dcd-members-list"); 
        if(displayValue != null && displayValue.style.display != "none") { 
            document.getElementById("dcd-members-list").style.display = "none";
        }
        let channelDisplay = document.getElementById("channel" + index);
        if(channelDisplay!=null) {
            channelDisplay.style.fontWeight = "normal";
        }

    }
    useEffect(() => {
        fetchChannels();
        let socket = socketIOClient(ENDPOINT, {auth: {Authorization: localStorage.getItem('token')}});
        /*socket.on("connection", data => {
          setResponse(data);
          console.log(response);
        });*/
        
        return () => socket.disconnect();
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
                {channelNames.map((channel, index) => <button onClick={channelClicked.bind(this, channel, index)} id={"channel"+index}>@{channel.channelName}</button>)}
            </div>
        </div>
        <div className="ch-chat-display">
            {channelNames.length == 0 && <DynamicChatDisplay projectname={projectDetails.projectName} channelname={activeComponent} channelId={null} messages={[]}/>}
            {channelNames.length != 0 && <DynamicChatDisplay projectname={projectDetails.projectName} channelname={activeComponent} channelId={activeChannelId} messages={allMessages} callBack={chatHomeCallback.bind(this)}/>}
        </div>
    </div>
    )
}

export default ChatHome;