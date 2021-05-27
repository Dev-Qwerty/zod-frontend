import { Link } from "react-router-dom";
import './CreateChannel.css';
import ccSvg from '../../assets/channel.svg';
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Button from 'react-bootstrap-button-loader';

toast.configure()

let emails = [];
function CreateChannel() {
    const [channelName, setChannelName] = useState('');
    const [members, setMembers] = useState([{name: "", email: ""}]);
    const [allmembers, setAllMembers] = useState([{name: "", email: ""}]);
    const [channelDesc, setDesc] = useState('');
    const [disable, setDisable] = useState(false);
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Create');

    const handleChannelNameChange = (e) => setChannelName(e.target.value);
    const handleDescChange = (e) => setDesc(e.target.value);

    const optionClicked = (e, index) => {
        if(index == emails.length) {
            if(!emails.includes(e.target.value)) {
                emails.push({email: e.target.value});
            }
        }
        else if(index < emails.length) {
            emails[index].email = e.target.value;
        }
    }

    const handleRemoveBtn = index => {
        const list = [...members];
        list.splice(index, 1);
        setMembers(list);
        if(emails[index].email!=undefined) {
            emails = emails.filter(function(item) {
                return item.email !== emails[index].email
            })
        }        
    };

    const handleAddBtn = () => {
        setMembers([...members, { name: "", email: "" }]);
    };

    function CreateChannelRequest(name, desc, members) {
        setLoader(true);
        setBtnText('Creating..');
        const projectData = JSON.parse(localStorage.getItem("pdata"));
        const projectID = projectData.projectID;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }
        axios.post('https://zode-chat-service-test.herokuapp.com/api/channel/new', {
            channelName: name,
            projectid: projectID,
            description: desc,
            members
        }, config).then((response) => {
            console.log(response);
            if(response.status === 201) {
                alert("Success!");
                toast.info('Channel Created!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/chat/home';
                  }, 3500);
            }
        }).catch((error) => {
            setBtnText('Create');
            setLoader(false);
            toast.error(error.message, {position: toast.POSITION.BOTTOM_LEFT});
        })
        }

    const getMembers = () => {
    setDisable(true);
    let projectData = JSON.parse(localStorage.getItem("pdata"));
    let url = 'https://projectservice-zode.herokuapp.com/api/projects/' + projectData.projectID + '/members';
    axios.get(url, {headers: {
        "Access-Control-Allow-Origin" : "*",
        "Authorization": localStorage.getItem("token")
    }}).then(response => {
        setAllMembers(response.data.projectMembers);
    })

    setTimeout(()=> setDisable(false), 600000);
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
            <input type="text" className="cc-name" onChange={handleChannelNameChange}></input>
            <h3>Description</h3>
            <textarea className="cc-desc" onChange={handleDescChange}></textarea>
            <h3 className="cc-members-title">Members</h3>
            <button type="button" className="cc-refresh-btn" onClick={getMembers} disabled={disable}>
                <span className="glyphicon glyphicon-refresh"></span> Refresh
            </button>
            {members.map((x, i) => {
                return (
                    <div className="cpm-box">
                        <div className="cpm-one-row-wrapper">
                            <select name="members" id={"members"} onChange={(e) => optionClicked(e, i)}>
                            <option value="none" selected disabled hidden> Select Members </option>
                            {allmembers.map((members, index) => <option key={members.email} value={members.email} id={"members" + index}>{members.name} - {members.email}</option>)}
                            </select>
                            <span className="cpm-btn-box">
                                {members.length !== 1 && <button onClick={() => handleRemoveBtn(i)} className="cpm-remove-btn">Remove</button>}
                                {members.length - 1 === i && <button onClick={handleAddBtn} className="cpm-add-btn">New</button>}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
        <Button variant="success" loading={loading} className="cc-create-btn" onClick={CreateChannelRequest.bind(this, channelName, channelDesc, emails)}>{btnText}</Button>
    </div>
    )
}

export default CreateChannel;