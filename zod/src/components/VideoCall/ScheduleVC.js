import './ScheduleVC.css';
import { Link } from 'react-router-dom';
import VideoCallSVG from '../../assets/video-call-svg.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap-button-loader';
import { toast } from 'react-toastify';

let emails = [];

function ScheduleVideoCall() {
    const [members, setMembers] = useState([{name: "", email: ""}]);
    const [allmembers, setAllMembers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Schedule');
    const [meetName, setMeetName] = useState('');

    const onNameChange = (e) => {
        setMeetName(e.target.value);
    }

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

    const allMembersChecked = () => {
        setChecked(!checked);
    }
    
    useEffect(() => {
        getMembers();
    }, []);

    useEffect(() => {
        if(checked == true) {
            setMembers(allmembers);
            setTimeout(() => {
                let i;
                for(i=0;i<allmembers.length; i++) {
                    emails.push(allmembers[i].email);
                    let el = document.getElementById("member"+i);
                    console.log(el);
                    if(el!=null) {
                        el.selectedIndex = i+1;
                    }
                }
            }, 200);
        }
        else {
            setMembers([{name: "", email: ""}]);
        }
    }, [checked])
    
    return(
        <div className="svc-page">
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
        <div className="svc-desc-headers"> 
            <h2>Schedule a New Meeting</h2>
            <h3>Interact with your project members via Video Call</h3>
            <h4>Schedule a meeting here</h4>
        </div>
        <img src={VideoCallSVG} className="svc-videocall-svg"></img>
        <div className="svc-details">
            <span>Meeting Name</span>
            <input type="text" placeholder="Enter meeting name" onChange={onNameChange}></input>
            <span className="svc-meet-members">Participants</span>
            <label>Select All Project Members</label>
            <input type="checkbox" onChange={allMembersChecked}></input>
            {members.map((x, i) => {
                return (
                    <div className="cpm-box">
                        <div className="cpm-one-row-wrapper">
                            <select name="members" id={"member" + i} onChange={(e) => optionClicked(e, i)}>
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
            <Button variant="success" loading={loading} className="svc-create-btn" onClick={ScheduleVCRequest.bind(this, meetName, emails, setLoader, setBtnText)}>{btnText}</Button>
        </div>
    </div>
    )
}

function ScheduleVCRequest(name, members, setLoader, setBtnText) {
    setLoader(true);
    setBtnText('Scheduling');
    let projectDetails = JSON.parse(localStorage.getItem('pdata'));
    const projectID = projectDetails.projectID;
    axios.post("https://meet-zode.herokuapp.com/api/meet/new", {
        "meetName": name,
        "projectID": projectID,
        "members": members
    }, {
        headers: {
        "Access-Control-Allow-Origin" : "*",
        "Authorization": localStorage.getItem("token")
    }}).then(response => {
        if(response.status === 201) {
            toast.success("Meeting Scheduled", {position: toast.POSITION.BOTTOM_RIGHT});
            setBtnText('Scheduled!');
            setLoader(false);
            window.location.href = response.data.link + "?t=" + localStorage.getItem("token");
        }
    }).catch((error) => {
        setBtnText('Schedule');
        setLoader(false);
        toast.error(error.message, {position: toast.POSITION.BOTTOM_RIGHT});
    });
}

export default ScheduleVideoCall;