import emojiIcon from '../../assets/emoji_icon.svg';
import attachIcon from '../../assets/attachment_icon.svg';
import sendIcon from '../../assets/send_msg_icon.svg';
import ChatSVG from '../../assets/Chat-Home.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DynamicChatDisplay.css';
import { useState, useEffect, useRef } from 'react';
import Loader from '../Loader/Loader';
import Picker from 'emoji-picker-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';
import socketIOClient from 'socket.io-client';
import { toast } from 'react-toastify';
let projectDetails = JSON.parse(localStorage.getItem('pdata'));
let ENDPOINT;
if(projectDetails) {
ENDPOINT = 'https://chatservice-zode.herokuapp.com/'+ projectDetails.projectID + "/chat";
}
let index = 0;
let currentUserEmail = '';
let channelId = '';

function DynamicChatDisplay(props) {
    let currentUser = firebase.auth().currentUser;
    let [channelMembers, setChannelMembers] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    let [inputMsg, setInputMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    let [messages, setMessages] = useState([]);
    const [flag, setFlag] = useState(0);
    const [editedMsg, setEditMsg] = useState('');
    let [hiddenInput, setHiddenInput] = useState('');

    let channelMsgs = [];

    if(props.channelId) {
        channelId = props.channelId;
    }
    
    const modalHandleClose = () => setShowModal(false);
    const addNewMemberRequest = () => {
        setShowModal(false);
        let email = document.getElementById("new-members").value;
        let url = "https://zode-chat-service-test.herokuapp.com/api/channel/" + projectDetails.projectID +"/"+ channelId +"/members";
        axios.post(url, {
            "members": [
                {
                    "email": email
                }
            ]
        }, {
            headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            if(response.status === 200) {
                let url = "https://zode-chat-service-test.herokuapp.com/api/channel/" + projectDetails.projectID + "/" + channelId + "/members";
                axios.get(url, {headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Authorization": localStorage.getItem("token")
                }}).then(response => {
                setChannelMembers(response.data);
                })
            }
        })
    }
    const modalHandleShow = () => {
        setShowModal(true);
        fetchNewMembers();
    };
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInputMsg(inputMsg + emojiObject.emoji);
    }
    const onInputMsgChange = (e) => {
        setInputMsg(e.target.value);
    }

    const onEditMsgChange = (e) => {
        setEditMsg(e.target.value);
    }

    let projectDetails = JSON.parse(localStorage.getItem('pdata'));
    function displayDropDown () {
        let displayValue = document.getElementById("dcd-more-options").style.display;
        if(displayValue == "none") {
            document.getElementById("dcd-more-options").style.display = "block";
        }
        else {
            document.getElementById("dcd-more-options").style.display = "none";
        }    
    }
    function newMessageReceived(data) {
        if(data.channelid == channelId) {
                channelMsgs.push(data);
                setMessages(channelMsgs);
                setFlag(0);
                setHiddenInput('new message');
                setHiddenInput('');
                updateScroll();
    }/*
        if(data.channelid = channelId) {
            let url = "https://chatservice-zode.herokuapp.com/api/messages/"+ channelId + "?latest=" + Math.floor(Date.now());
            axios.get(url, {headers: {
                "Access-Control-Allow-Origin" : "*",
                "Authorization": localStorage.getItem("token")
            }}).then(response => {
                setMessages(response.data);
                setFlag(0);
            })
        }*/
    }
    function displayEmojiPicker () {
        let displayValue = document.getElementById("dcd-emoji-picker").style.display;
        if(displayValue == "none") {
            document.getElementById("dcd-emoji-picker").style.display = "block";
        }
        else {
            document.getElementById("dcd-emoji-picker").style.display = "none";
        }       
    }

    function displayEditMessage(i) {
        let displayValue = document.getElementById("dcd-edit-msg-input"+i);
        if(displayValue) {
            if(displayValue.style.display == "none") {
                displayValue.style.display = "block";
            }
            else {
                displayValue.style.display = "none";
            }
        }
    }
    function updateScroll(){
        var element = document.getElementById("dcd-messages-display");
        if(element!=null) {
            element.scrollTop = element.scrollHeight;
        }
    }

    function fetchMembers() {
        let channelId = props.channelId;
        setChannelMembers([]);
        let url = "https://zode-chat-service-test.herokuapp.com/api/channel/" + projectDetails.projectID + "/" + channelId + "/members";
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            setChannelMembers(response.data);
        })
        let displayValue = document.getElementById("dcd-members-list").style.display;
        if(displayValue == "none") {
            document.getElementById("dcd-members-list").style.display = "block";
        }
        else {
            document.getElementById("dcd-members-list").style.display = "none";
        }
    }

    function fetchNewMembers() {
        let channelId = props.channelId;
        let url = "https://chatservice-zode.herokuapp.com/api/channel/"+ projectDetails.projectID + "/"+ channelId + "/fetchmembers";
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            setNewMembers(response.data);
        })
    }

    function sendMessage() {
        inputMsg = inputMsg.trim();
        if(inputMsg == '') {
            setInputMsg('');
            return;
        }
        let channelId = props.channelId;
        let url = "https://chatservice-zode.herokuapp.com/api/chat/"+ channelId +"/messages";
        axios.post(url, {
            "content": inputMsg
        },
        {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                    "Authorization": localStorage.getItem("token")
                }
            }
        ).then(response => {
            if(response.status == 200) {
                setInputMsg('');
            }
        })
    }

    function timeConverter(unix_ts) {
        let date = new Date(unix_ts);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime = date.toLocaleDateString('en-GB') + ' ' + (hours>12?hours-12:hours) + ':' + minutes.substr(-2) + (hours<12?'AM' : 'PM');
        return formattedTime;
    }

    function getOlderMessages() {
        let msgDiv = document.getElementById("dcd-messages-display");
        if(msgDiv != null && msgDiv.scrollTop == 0) {
        if(messages.length>0) {
        setFlag(1);
        let url = "https://chatservice-zode.herokuapp.com/api/messages/"+ props.channelId + "?latest=" + messages[0].ts;
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
                if(response.data!=[]) {
                    index += 1;
                    let temp = [];
                    temp = response.data;
                    messages = temp.concat(messages);
                    setMessages(messages);
                    let msg = document.getElementById("dcd-message"+ ((index * 20)));
                    if(msg!=null) {
                        let pos = msg.offsetTop;
                        msgDiv.scrollTop = pos;
                    }   
                }
            })
        }}
    }

    function deleteMessage(ts, i) {
        let url = "https://chatservice-zode.herokuapp.com/api/chat/"+ props.channelId +"/messages/" + ts;
        axios.delete(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            if(response.status == 200) {
                toast.success("Message Deleted", {position: toast.POSITION.BOTTOM_RIGHT});
            }
        })
    }

    function editMessageRequest(i, editedMsg) {
        let url = "https://chatservice-zode.herokuapp.com/api/chat/" + props.channelId + "/messages/" + messages[i].ts + "/update";
        axios.put(url, {
            "content": editedMsg
        } ,{headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            if(response.status === 200) {
                document.getElementById("dcd-edit-msg-input"+i).style.display = "none";
            }
        })
    }

    useEffect(() => {
        channelMsgs = [];
        channelId = props.channelId;
        setMessages([]);
        setHiddenInput('clear message');
        setHiddenInput('');
        let url = "https://chatservice-zode.herokuapp.com/api/messages/"+ props.channelId + "?latest=" + Math.floor(Date.now());
        axios.get(url, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": localStorage.getItem("token")
        }}).then(response => {
            setMessages(response.data);
            setHiddenInput('channel change');
            setHiddenInput('');
            setFlag(0);
            channelMsgs = response.data;
        })
        let socket = socketIOClient(ENDPOINT, {auth: {Authorization: localStorage.getItem('token')}});

        socket.on("newMessage", data=> {
            console.log("New message received!");
            if(channelId != data.channelid) {
                props.callBack(data.channelid);
            }
            newMessageReceived(data);
        })

        socket.on("deleteMessage", data=> {
            let msgDiv = document.getElementById("dcd-messages-display");
            if(data.channelid == channelId) {
                let i, value;
                for(i=0;i<channelMsgs.length; i++) {
                    if(channelMsgs[i].ts == data.ts) {
                        value = channelMsgs[i];
                        break;
                    }
                }
                channelMsgs = channelMsgs.filter(item => item !== value);
                setMessages(channelMsgs);
                let msg = document.getElementById("dcd-message"+ ((i-1)));
                if(msgDiv && msg!=null) {
                    let pos = msg.offsetTop;
                    msgDiv.scrollTop = pos;
                }
            }  
        })

        socket.on("updateMessage", data => {
            if(data.channelid == channelId) {
                let i;
                for(i=0;i<channelMsgs.length; i++) {
                    if(channelMsgs[i].ts == data.ts) {
                        channelMsgs[i].content = data.content;
                    }
                }
                setMessages(channelMsgs);
                setHiddenInput('message edited');
                setHiddenInput('');
            }
        })
        return () => socket.disconnect();
    },[channelId]);

    useEffect(() => {
        if(flag == 0) {
            updateScroll();
        }
    }, [messages.length, flag]);

    useEffect(() => {
        if(currentUser!=null) {
            currentUserEmail = currentUser.email;
        }
    }, []);

    if(props.channelname != 'default') {
        return(
        <div className="dcd-display">
        <div className="dcd-wrapper">
            <div className="dcd-header">
                <h3>{props.projectname} / {props.channelname}</h3>
                <div className="dcd-icon-tray">
                    <div className="dcd-add-icon" onClick={fetchMembers.bind(this)}></div>
                    <div className="dcd-video-call-icon"></div>
                    <div className="dcd-more-options-icon" onClick={displayDropDown}></div>
                </div>
                <div className="dcd-more-options" id="dcd-more-options">
                    <p>Edit Channel</p>
                    <p>Leave Channel</p>
                    <p>Delete Channel</p>
                </div>
            </div>
        </div>
        <div className="dcd-members-list-wrapper" id="dcd-members-list" style={{display: "none"}}>
            <h3>Members</h3><button value="X" className="dcd-members-closelist" onClick={() => document.getElementById("dcd-members-list").style.display = "none"}>X</button>
            <button className="dcd-add-member-btn" onClick={modalHandleShow}>+New</button>
            <Modal show={showModal} onHide={modalHandleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select id="new-members">
                        <option value="none" selected disabled hidden> Select New Member </option>
                        {newMembers.map((x,i) => <option value={x.email}>{x.name}</option>)}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalHandleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={addNewMemberRequest.bind(this)}>
                    Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {channelMembers.length == 0 && <Loader/>}
            {channelMembers.map((member, index) => 
            <div className="dcd-member">
                    <span>{member.name}</span>
                    <button>Remove</button>
            </div>
            )}    
        </div>
        <div className="dcd-textbox">
            <textarea value={inputMsg} onChange={onInputMsgChange}></textarea>
            <div className="dcd-icon-chat-tray">
                <img className="dcd-emoji-icon" src={emojiIcon} onClick={displayEmojiPicker}></img>
                <div id="dcd-emoji-picker">
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
                <img className="dcd-attach-icon" src={attachIcon}></img>
            </div>
            <img className="dcd-send-icon" src={sendIcon} onClick={sendMessage.bind(this)}></img>
        </div>
        <div className="dcd-messages-display" id="dcd-messages-display" onScroll={getOlderMessages}>
                {messages.map((x, i) => <div className="dcd-message" id={"dcd-message"+i}>
                    <h3>{x.author.name} <span>{timeConverter(x.ts)}</span>
                    {(currentUserEmail == x.author.email) && <span className="dcd-edit-remove-options">
                        <button className="dcd-edit-msg-icon" onClick={displayEditMessage.bind(this, i)}> </button>
                        <button className="dcd-remove-msg-icon" onClick={deleteMessage.bind(this, x.ts, i)}></button>
                    </span>}
                    </h3>
                    <h4>{x.content}</h4>
                    <div className="dcd-edit-msg-input" id={"dcd-edit-msg-input"+i}>
                        <input placeholder={x.content} onChange={onEditMsgChange}></input>
                        <button onClick={editMessageRequest.bind(this, i, editedMsg)}>Edit Message</button>
                    </div>
                    <input hidden disabled value={hiddenInput}></input>
                </div>)}
        </div>
        </div>
        )
    }
    else {
        return (
        <div className="ch-default-display">
                <img src={ChatSVG} alt="Chat SVG" className="ch-chat-svg"></img>
                <div className="ch-chat-instrns">
                    <span>Click on a channel or personal chat to begin a conversation.</span>
                    <span>No channels created? Click <Link to="/chat/createChannel">here</Link> to create one.</span>
                </div>
        </div>
        )
    }
}

export default DynamicChatDisplay;