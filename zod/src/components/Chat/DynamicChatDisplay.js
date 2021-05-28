import emojiIcon from '../../assets/emoji_icon.svg';
import attachIcon from '../../assets/attachment_icon.svg';
import sendIcon from '../../assets/send_msg_icon.svg';
import ChatSVG from '../../assets/Chat-Home.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DynamicChatDisplay.css';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Picker from 'emoji-picker-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DynamicChatDisplay(props) {
    let [channelMembers, setChannelMembers] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    let [inputMsg, setInputMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newMembers, setNewMembers] = useState([]);

    const modalHandleClose = () => setShowModal(false);
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
    function displayEmojiPicker () {
        let displayValue = document.getElementById("dcd-emoji-picker").style.display;
        if(displayValue == "none") {
            document.getElementById("dcd-emoji-picker").style.display = "block";
        }
        else {
            document.getElementById("dcd-emoji-picker").style.display = "none";
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
                    <select>
                        <option value="none" selected disabled hidden> Select New Member </option>
                        {newMembers.map((x,i) => <option value={x.email}>{x.name}</option>)}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalHandleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={modalHandleClose}>
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