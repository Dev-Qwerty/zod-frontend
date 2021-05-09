import addMemberIcon from '../../assets/add-member-svg.svg';
import videoCallIcon from '../../assets/video-call-icon.svg';
import moreOptionsIcon from '../../assets/more-options.svg';
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
    return(
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
    )
}

export default DynamicChatDisplay;