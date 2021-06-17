import './ProjectD.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import refreshToken from '../../functions/refreshToken';
import axios from 'axios';
import CirclesLoader from '../Loader/CirclesLoader';
import firebase from 'firebase';

/* 
    HOME

    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class ProjectD extends React.Component {

    constructor() {
     
        super();
        this.state = {
            Ldata: null,
            tlead: '',
            dline: '',
            memebrs: '',
            isEmpty: false,
        }
    }

    componentDidMount(){


        refreshToken();

        const obj1 = JSON.parse(localStorage.getItem('pdata'));

        this.setState({
            pname : obj1.projectName,
            tlead: obj1.teamlead,
            dline: obj1.deadline
        });      
        
        this.getMeetingLinks();
        this.getProfileImageURL();
        this.getMembers();
    }

    getMembers = () => {
   
        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'))

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://projectservice-zode.herokuapp.com/api/projects/' + obj.projectID + '/members';

        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {

                const Data = res.data.projectMembers
                this.setState({ members: Data });
                //alert(JSON.stringify(Data))
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            };
        });         
    }

    getMeetingLinks = () => {

        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://meet-zode.herokuapp.com/api/meet/' + obj.projectID;

        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {

                //alert(JSON.stringify(res.data));
                this.setState({
                    Ldata : res.data,
                }); 

                if(res.data == null) {
                    this.setState({ isEmpty: true });
                } else {
                    this.setState({ isEmpty: false }); 
                }                
                
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });
    }

    getProfileImageURL = () => {
        const user = firebase.auth().currentUser;
        if(user) {
            let avatar = document.getElementById("bd-icon");
            if(avatar != null) {
                avatar.src = user.photoURL
            }
            return user.photoURL;
        }
    }
    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    joinBtn = (dat) => {
        //alert(JSON.stringify(dat.meetUrl));
        window.location.href = dat.meetUrl;
    }

    render() {

        return (
            <div className="ProjectD">
                
                <div className="pd-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lb"><p className="pd-title" onClick={ this.backToBaseFn }>zode</p></div>
                    </div>
    
                    <div className="bd-right-wrapper">
    
                        <div className="bd-profile-icon-wrapper">
    
                            <div>
                                <img className="bd-icon" id="bd-icon" src={this.getProfileImageURL()}/>
                            </div>
    
                            <div className="bd-dropdown-content">
                                <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>Profile</p></Link>
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
                                <div className="pd-lng1-wrapper">
                                    <div className="pd-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-chat" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng4" data-tip data-for="calTip">
                                </div>
                            </Link> 
                            <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng5" data-tip data-for="videoCallTip"></div>
                            </Link>
                            <div className="pd-lng6" data-tip data-for="noneTip"></div>
                            <div className="pd-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet/Video Call</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">

                            <div className="pdb-hdn-left">
                                <div className="pdb-hl-1"><p>Project Name:&nbsp;&nbsp;{ this.state.pname }</p></div>
                                <div className="pdb-hl-2"><p>Team Lead:&nbsp;&nbsp;<span className="wrx">{ this.state.tlead }</span></p></div>
                            </div>

                            <div className="pdb-hdn-right">
                                <div className="pdb-hr-1"><p>Due By:&nbsp;&nbsp;{ this.state.dline }</p></div>
                            </div>
                        </div>

                        <div className="pdb-proLine"></div>

                        <div className="pdb-meetings">

                            <div className="pdb-m-left">
                                
                                <div className="">
            
                                    <p className="pdml-hdn">Scheduled Meetings</p>

                                    <div className="Xpdml-sch-meeting">
                                        
                                        <div className="Xpdml-sch-grid-block1 cmx">
                                            <p>Meeting Name</p>
                                        </div>  

                                        <div className="Xpdml-sch-grid-block2 cmx">
                                            <p>Email</p>
                                        </div>

                                        <div className="Xpdml-sch-grid-block3 cmx">
                                            <p>Date</p>
                                        </div>

                                        <div className="Xpdml-sch-grid-block4 cmx">
                                            <p>Time</p>
                                        </div>

                                        <div className="Xpdml-sch-grid-block5 cmx">
                                            <p>Join</p>
                                        </div>                                                                                                                                                                                                      
                                    </div>

                                    <div className="pdml-proLineX"></div>

                                    <div className="pdml-link-wrx">

                                        { !this.state.Ldata ? (

                                            this.state.isEmpty ? (
                                                <p></p>
                                            ): (
                                                <div className="PD-loading">
                                                    <CirclesLoader />
                                                </div> 
                                            )                                   

                                        ):( this.state.Ldata.map((ldat, i) => (
                                            
                                            <div className="pdml-sch-meeting">
                                                
                                                <div className="pdml-sch-grid-block1 cmx">
                                                    <p>{ JSON.parse(JSON.stringify(ldat.meetName)) }</p>
                                                </div>

                                                <div className="pdml-sch-grid-block2 cmx">
                                                    <p>{ JSON.parse(JSON.stringify(ldat.createdBy)) }</p>
                                                </div>

                                                <div className="pdml-sch-grid-block3 cmx">
                                                    <p>{ JSON.parse(JSON.stringify(ldat.date)) }</p>
                                                </div>

                                                <div className="pdml-sch-grid-block4 cmx">
                                                    <p>{ JSON.parse(JSON.stringify(ldat.time)) }</p>
                                                </div>

                                                <div className="pdml-sch-grid-block5 cmx">
                                                    <p onClick={ () => this.joinBtn(ldat) }>Join</p>
                                                </div>
                                            </div>                                           
                                            
                                        )))}                               

                                    </div>
                                </div>
                            </div>
                            
                            <div className="pdb-m-right">
                                
                                <div className="pdb-members-online-wrx">
                                    
                                    <div className="pdb-online-one">
                                        <p>Members Online</p>
                                    </div>
                                    
                                    <div className="pdb-online-two"></div>                                
                                </div> 

                                <div className="pdb-online-proLine"></div> 
                                
                                <div className="pdb-online-users">

                                    { !this.state.members ? (
                                        
                                        <div className="PD-loading">
                                            <CirclesLoader />
                                        </div>                                    

                                    ):( this.state.members.map((mem, i) => (
                                        <p>{ JSON.parse(JSON.stringify(mem.name)) }</p>
                                    )))} 

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}