import { Link } from "react-router-dom";
import './CreateChannel.css';
import ccSvg from '../../assets/channel.svg';
import { useEffect, useState } from "react";
import axios from 'axios';

function CreateChannel() {
    const [channelName, setChannelName] = useState('');
    const [members, setMembers] = useState([{fname: "", email: ""}]);
    const [allmembers, setAllMembers] = useState([{fname: "", email: ""}])

    const handleChannelNameChange = (e) => setChannelName(e.target.value);

    const handleRemoveBtn = index => {
        const list = [...members];
        list.splice(index, 1);
        setMembers(list);
    };

    const handleAddBtn = () => {
        setMembers([...members, { fname: "", email: "" }]);
    };

    const getMembers = () => {
    let projectData = JSON.parse(localStorage.getItem("pdata"));
    let url = 'https://projectservice-zode.herokuapp.com/api/projects/' + projectData.projectID + '/members';
    axios.get(url, {headers: {
        "Access-Control-Allow-Origin" : "*",
        "Authorization": localStorage.getItem("token")
    }}).then(response => {
        setAllMembers(response.data.projectMembers);
    })
    }

    window.addEventListener('load', getMembers);

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
            {members.map((x, i) => {
                return (
                    <div className="cpm-box">
                        <div className="cpm-one-row-wrapper">
                            <select name="members" id="members">
                            {allmembers.map((members) => <option key={members.email} value={members.name}>{members.name} - {members.email}</option>)}
                            </select>
                            <span className="cpm-btn-box">
                                {members.length !== 1 && <button onClick={() => handleRemoveBtn(i)} className="cpm-remove-btn">Remove</button>}
                                {members.length - 1 === i && <button onClick={handleAddBtn} className="cpm-add-btn">Add</button>}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}

//function CreateChannelRequest()

export default CreateChannel;