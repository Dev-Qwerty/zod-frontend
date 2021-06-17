import './ScheduleVC.css';
import { Link } from 'react-router-dom';
import VideoCallSVG from '../../assets/video-call-svg.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap-button-loader';
import { toast } from 'react-toastify';
import ReactTooltip from "react-tooltip";
import firebase from 'firebase';

let emails = [];

function ScheduleVideoCall() {
    const [members, setMembers] = useState([{name: "", email: ""}]);
    const [allmembers, setAllMembers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Schedule');
    const [meetName, setMeetName] = useState('');
    const [meetDate, setDate] = useState('');
    const [meetTime, setTime] = useState('');
    const [laterChecked, setLaterChecked] = useState(false);

    const onNameChange = (e) => {
        setMeetName(e.target.value);
    }

    const optionClicked = (e, index) => {
        if(index == emails.length) {
            if(!emails.includes(e.target.value)) {
                emails.push(e.target.value);
            }
        }
        else if(index < emails.length) {
            emails[index] = e.target.value;
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

    function getProfileImageURL() {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    const allMembersChecked = () => {
        setChecked(!checked);
    }

    const scheduleLaterChecked = () => {
        setLaterChecked(!laterChecked);
    }

    const onDateChange = (e) => {
        console.log(e.target.value);
        setDate(e.target.value)
    }

    const onTimeChange = (e) => {
        console.log(e.target.value);
        setTime(e.target.value);
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

    useEffect(() => {
        if(laterChecked == true) {
            document.getElementById('svc-schedulelater-inputs').style.display = "block";
        }
        else {
            document.getElementById('svc-schedulelater-inputs').style.display = "none";
        }
    })
    
    return(
        <div className="svc-page">
            <div className="bd-top-nav">
                <div className="bd-left-wrapper">
                    <Link to="/basedashboard/home" style={{ textDecoration: 'none' }}><p className="bd-title">zode</p></Link>
                </div>
    
            <div className="bd-right-wrapper">
                <div className="bd-profile-icon-wrapper">
                    <div>
                        <img className="bd-icon" src = { getProfileImageURL() }/>
                    </div>
    
                    <div className="bd-dropdown-content">
                        <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>My Profile</p></Link>
                        <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="pd-body-wrapper">
        <div className="pd-left-nav">
        <div className="pd-left-nav-grid">
                <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                    <div className="ch-lng1-wrapper">
                        <div className="ch-lng1" data-tip data-for="homeTip"></div>
                    </div>
                </Link> 
                <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                    <div className="pd-lng2" data-tip data-for="boardTip"></div>
                </Link>
                <Link to="/chat/home" style={{ textDecoration: 'none' }}><div className="personal-cb-lng3" data-tip data-for="chatTip"></div></Link>
                <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                    <div className="personal-cb-lng4" data-tip data-for="calTip"></div>
                </Link>
                <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                    <div className="svc-lng5" data-tip data-for="videoCallTip"></div>
                </Link>
                <div className="pd-lng6"></div>
                <div className="pd-lng7"></div>
                <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calendar</ReactTooltip>
                <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet/Video Call</ReactTooltip>            
            </div>
        </div>
        </div>
        <div className="svc-wrapper">
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
            <label>Schedule for Later</label>
            <input type = "checkbox" onChange={scheduleLaterChecked}></input>
            <div className="svc-schedulelater-inputs" id="svc-schedulelater-inputs">
                <input type = "date" placeholder="Date" onChange={onDateChange} value={meetDate}></input>
                <input type = "time" placeholder="Time" onChange={onTimeChange} value={meetTime}></input>
            </div>
            <Button variant="success" loading={loading} className="svc-create-btn" onClick={ScheduleVCRequest.bind(this, meetName, emails, setLoader, setBtnText, meetDate, meetTime)}>{btnText}</Button>
        </div>
        </div>
    </div>
    )
}

function ScheduleVCRequest(name, members, setLoader, setBtnText, meetDate, meetTime) {
    setLoader(true);
    setBtnText('Scheduling');
    let projectDetails = JSON.parse(localStorage.getItem('pdata'));
    const projectID = projectDetails.projectID;
    if(meetDate == '') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        meetDate = today;
        meetTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
    
    axios.post("https://meet-zode.herokuapp.com/api/meet/new", {
        "meetName": name,
        "projectID": projectID,
        "members": members,
        "date": meetDate,
        "time": meetTime
    }, {
        headers: {
        "Access-Control-Allow-Origin" : "*",
        "Authorization": localStorage.getItem("token")
    }}).then(response => {
        if(response.status === 201) {
            toast.success("Meeting Scheduled", {position: toast.POSITION.BOTTOM_RIGHT});
            setBtnText('Scheduled!');
            setLoader(false);
            //window.location.href = response.data.link + "?t=" + localStorage.getItem("token");
        }
    }).catch((error) => {
        setBtnText('Schedule');
        setLoader(false);
        toast.error(error.message, {position: toast.POSITION.BOTTOM_RIGHT});
    });
}

export default ScheduleVideoCall;