import { Link } from 'react-router-dom';
import './ChatHome.css';
import ChatSVG from '../../assets/Chat-Home.svg';

function ChatHome() {
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
        <h1 className="ch-title">Conversations</h1>
        <div className="chat-home-svg">
            <img src={ChatSVG} alt="Chat SVG" className="ch-svg"></img>
        </div>
        <div className="ch-channel-wrapper">
            <h3 className="ch-channel-title">Your Channels</h3>
            <div className="ch-container">
                <div className="ch-single-box-wrapper"></div>
                <div className="ch-single-box-wrapper"></div>
            </div>
        </div>
        </div>
    )
}

export default ChatHome;