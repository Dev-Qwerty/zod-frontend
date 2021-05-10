import addMemberIcon from '../../assets/add-member-svg.svg';
import videoCallIcon from '../../assets/video-call-icon.svg';
import moreOptionsIcon from '../../assets/more-options.svg';
import emojiIcon from '../../assets/emoji_icon.svg';
import attachIcon from '../../assets/attachment_icon.svg';
import sendIcon from '../../assets/send_msg_icon.svg';
import ChatSVG from '../../assets/Chat-Home.svg';
import { Link } from 'react-router-dom';
import './DynamicChatDisplay.css';

function DynamicChatDisplay(props) {
    function displayDropDown () {
        let displayValue = document.getElementById("dcd-more-options").style.display;
        console.log(displayValue);
        if(displayValue == "none") {
            document.getElementById("dcd-more-options").style.display = "block";
        }
        else {
            document.getElementById("dcd-more-options").style.display = "none";
        }    
    }
    if(props.channelname != 'default') {
    return(
        <div className="dcd-display">
        <div className="dcd-wrapper">
            <div className="dcd-header">
                <h3>{props.projectname} / {props.channelname}</h3>
                <div className="dcd-icon-tray">
                    <img src={addMemberIcon} alt="Add Member"></img>
                    <img src={videoCallIcon} alt="Video Call"></img>
                    <img src={moreOptionsIcon} alt="More Options" className="dcd-more-options-icon" onClick={displayDropDown}></img>
                </div>
                <div className="dcd-more-options" id="dcd-more-options">
                    <p>Edit Channel</p>
                    <p>Leave Channel</p>
                    <p>Delete Channel</p>
                </div>
            </div>
        </div>
        <div className="dcd-textbox">
            <textarea></textarea>
            <div className="dcd-icon-chat-tray">
                <img className="dcd-emoji-icon" src={emojiIcon}></img>
                <img className="dcd-attach-icon" src={attachIcon}></img>
            </div>
            <img className="dcd-send-icon" src={sendIcon}></img>
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