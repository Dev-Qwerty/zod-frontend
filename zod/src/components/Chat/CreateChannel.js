import { Link } from "react-router-dom";
import './CreateChannel.css';
import ccSvg from '../../assets/channel.svg';

function CreateChannel() {
    return (
        <div className="zod-create-channel-page">
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
        <div className="cc-svg-1">
            <img src={ccSvg} alt="Create Channel SVG" className="create-channel-svg"></img>
        </div>

        <div className="cc-wrapper">
            <h1>Create Channel</h1>
            <h3>Channel Name</h3>
            <input type="text" className="cc-name"></input>
            <h3>Description</h3>
            <textarea className="cc-desc"></textarea>
            <h3>Members</h3>
            <div className="cc-members-list">
                <input type="text" className="cc-name"></input>
                <button className="cc-remove-btn">Remove</button>
                <input type="text" className="cc-name"></input>
                <button className="cc-add-btn">Add</button>
                <button className="cc-remove-btn">Remove</button>
            </div>
        </div>
    </div>
    )
}

export default CreateChannel;