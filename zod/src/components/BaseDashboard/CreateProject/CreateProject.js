import './CreateProject.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';
import refreshToken from '../../../functions/refreshToken';
import Button from 'react-bootstrap-button-loader'; 

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function CreateProject() {

    const [pname, setPnameValue] = useState('');
    const [deadline, setDeadlineValue] = useState('');
    const [avatar, setAvatar] = useState('');
    const [memberList, setMemberList] = useState([{ email: "", userRole: "" }]);
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Create');


    // handle input change - pname, deadline
    const handlePnameChange = (e) => setPnameValue(e.target.value);
    const handleDeadlineChange = (e) => setDeadlineValue(e.target.value);
   
    // handle input change - memberList
    const handleMemberInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...memberList];
        list[index][name] = value;
        setMemberList(list);
    };    

    // handle click event - Remove button
    const handleRemoveBtn = index => {
        const list = [...memberList];
        list.splice(index, 1);
        setMemberList(list);
    };
    
    // Handle click event - Add button
    const handleAddBtn = () => {
        setMemberList([...memberList, { email: "", userRole: "" }]);
    }; 
      
      
    useEffect(() => {
 
        // update token
        const user = firebase.auth().currentUser
        if (user) {
            localStorage.setItem('photoURL', user.photoURL);

        } else {
            // Not Signed-in
        } 

        refreshToken();
        
        setAvatar(localStorage.getItem('photoURL'));
    })   

    return (
        <div className="createPro">   

            <div className="cp-top-nav">

                <div className="cp-left-wrapper">
                    <p className="cp-title">zode</p>
                </div>

                <div className="cp-mid-wrapper">
                    <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                </div>

                <div className="cp-right-wrapper">

                    <div className="cp-profile-icon-wrapper">

                        <div>
                            <img className="cp-icon" src = { avatar }/>
                        </div>

                        <div className="cp-dropdown-content">
                            <Link to="/basedashboard/home" style={{ textDecoration: 'none' }}><p>Home</p></Link>
                            <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>My Profile</p></Link>
                            <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                        </div>
                    </div>
                </div>
            </div>   

            <div className="cp-rect-border-bottom">
                <p>Create New Project</p>
            </div>

            <div className="cp-box">
                
                <div className="cp-box-contents">

                    <div className="cp-inp-wrapper">

                        <p className="cp-label">Project Name</p>
                        <div><input type="text" placeholder="" className="cp-pname" onChange={handlePnameChange} value={pname}></input></div>
                        <p className="cp-label">Due Date</p>
                        <div><input type="date" placeholder="Deadline" className="cp-deadline" onChange={handleDeadlineChange}  value={deadline}></input></div>
                        
                        <div><p className="cp-addMembers">Add Members</p></div>
                    
                        {memberList.map((x, i) => {
                            
                            return (
                                <div className="cpm-box">
                                    
                                    <div className="cpm-one-row-wrapper">
                                    <input type="text" placeholder="Email" className="cpm-email" name="email" onChange={e => handleMemberInputChange(e, i)}/>

                                    <input list="userroles" placeholder="Role" className="cpm-role" name="userRole" onChange={e => handleMemberInputChange(e, i)}/>
                                    <datalist id="userroles">
                                        <option value="Owner"/>
                                        <option value="Member"/>
                                    </datalist>

                                    <span className="cpm-btn-box">
                                        {memberList.length !== 1 && <button onClick={() => handleRemoveBtn(i)} className="cpm-remove-btn">Remove</button>}
                                        {memberList.length - 1 === i && <button onClick={handleAddBtn} className="cpm-add-btn">New</button>}
                                    </span>
                                    </div>

                                </div>
                            );
                        })}                
                        <Button variant="success" loading={loading} className="cp-submit" onClick={createProjectFn.bind(this, pname, deadline, memberList, setBtnText, setLoader)}>{btnText}</Button>
                        <ToastContainer />
                    </div>

                </div>

            </div>

        </div>
    );
}

async function createProjectFn(pname, deadline, memberList, setBtnText, setLoader) {
    setBtnText('Creating...');
    setLoader(true);
    const token = localStorage.getItem('token')
    
    const reqBody = {
        "projectName": pname,
        "deadline": deadline,
        "pendingInvites": memberList
    }
    
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    }

    //toast("Project Createed :)");
    refreshToken();
    axios.post('https://projectservice-zode.herokuapp.com/api/projects/createproject', reqBody, config)
    .then((res) => {

        if(res.status === 201) {

            toast.info('Project Created!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                setBtnText('Created!');
                setLoader(false);
                window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';
              }, 2500);

        } else {
            setBtnText('Create');
            setLoader(false);
            toast.error('Some Error Occured!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    })   
}

export default CreateProject;