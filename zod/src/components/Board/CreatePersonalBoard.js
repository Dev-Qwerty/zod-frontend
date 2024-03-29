import './CreatePersonalBoard.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import refreshToken from '../../functions/refreshToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap-button-loader'; 
import firebase from 'firebase';
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CreatePersonalBoard extends React.Component {

    constructor() {
     
        super();
        this.state = {
            bname: '',
            members: '',
            loading: false,
            btnText: 'Create'
        }
    }

    componentDidMount(){
        refreshToken();
    }

    updateBname = (evt) => {
        this.setState({
            bname: evt.target.value
        });
    } 

    submitFn = () => {
        this.setState({
            loading: true,
            btnText: 'Creating...'
        })
        const tokenx = localStorage.getItem('token');
        const xobj = JSON.parse(localStorage.getItem('pdata')); 

        const config = {
            headers: {
                'Authorization': tokenx,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        const reqBody = {
            "boardName": this.state.bname,
            "members": [],
            "type": "private",
            "projectName": xobj.projectName,
            "projectId": xobj.projectID
        }

        let url = 'https://boardservice-zode.herokuapp.com/api/board/new';
        refreshToken();
        axios.post(url, reqBody, config)
        .then((res) => {
    
            if(res.status === 201) {
                
                console.log(JSON.stringify(res.data))
                toast.info('Personal Board Created!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        btnText: 'Created!'
                    })
                    window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/board/bhome';
                  }, 3000);
                
            } else {
                this.setState({
                    loading: false,
                    btnText: 'Create'
                })
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

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    getProfileImageURL() {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    render() {
    
        return (
            <div className="CreateBoard">
                
                <div className="personal-cb-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lb"><p className="pd-title" onClick={ this.backToBaseFn }>zode</p></div>
                    </div>
    
                    <div className="bd-right-wrapper">
    
                        <div className="bd-profile-icon-wrapper">

                            <div>
                                <img className="bd-icon" src = { this.getProfileImageURL() }/>
                            </div>

                        <div className="bd-dropdown-content">
                            <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>Profile</p></Link>
                            <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                        </div>
                    </div>
                </div>
    
                </div>

                <div className="personal-cb-body-wrapper">

                    <div className="personal-cb-left-nav">
                        
                        <div className="personal-cb-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng1-wrapper">
                                    <div className="personal-cb-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng4" data-tip data-for="calTip"></div>
                            </Link>

                            <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                                <div className="personal-cb-lng5" data-tip data-for="videoCallTip"></div>
                            </Link>
                            <div className="personal-cb-lng6" data-tip data-for="noneTip"></div>
                            <div className="personal-cb-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet/Video Call</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>  

                        </div>
                    </div>
                    
                    <div className="personal-cb-body">

                        <div className="pcb-proname">
                            <p>Create Personal Board</p>
                        </div>

                        <div className="pcb-proLine"></div>

                        <div className="pcb-gridWrx">
                            
                            <div className="pcb-g1">
                                
                                <p className="pcb-g1-bname-label">Board Name</p>
                                <div><input type="text" placeholder="" className="pcb-g1-bname-inp" value = { this.state.bname } onChange={ this.updateBname } ></input></div>
                                
                                <Button variant="success" loading={this.state.loading} className="pcb-g1-submit" onClick={ this.submitFn }>{this.state.btnText}</Button>                                                                             
                            </div>

                            <div className="pcb-g2">
                                <div className="pcb-pic"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}