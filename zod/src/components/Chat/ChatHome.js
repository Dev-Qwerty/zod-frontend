import { Link, Route } from 'react-router-dom';
import './ChatHome.css';
import ChatSVG from '../../assets/Chat-Home.svg';
import ChannelIcon from '../../assets/channel-icon.svg';

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
        <div className="ch-left-nav">
                        
            <div className="pd-left-nav-grid">
                            
                <div className="ch-lng1-wrapper">
                        <div className="ch-lng1"></div>
                </div>
                <div className="pd-lng2"></div>
                <Route render={({history})=> (<div className="ch-lng3" onClick={()=>{ history.push("/chat/createChannel")}}></div>)}></Route>
                <div className="pd-lng4"></div>
                <div className="pd-lng5"></div>
                <div className="pd-lng6"></div>
                <div className="pd-lng7"></div>
            </div>
        </div>
        <div className="ch-leftnav-2">
            <h2 className="ch-project-title">Project Name</h2>
            <hr></hr>
            <h3>Channels</h3>
            <div className="ch-channels-list">
                <a href="#">@everyone</a>
                <a href="#">@frontend</a>
            </div>
        </div>
        <div className="ch-chat-display">
            <div className="ch-default-display">
                <img src={ChatSVG} alt="Chat SVG" className="ch-chat-svg"></img>
                <div className="ch-chat-instrns">
                    <span>Click on a channel or personal chat to begin a conversation.</span>
                    <span>No channels created? Click <Link to="/chat/createChannel">here</Link> to create one.</span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChatHome;