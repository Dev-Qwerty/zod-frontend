import './Base.css';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import firebase from 'firebase';

export default class BaseDashboard  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            apiData: null
        }
    }   
    async componentDidMount() {
        
        this.timer = setInterval(
            () => {
                console.log("CALLED");
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        firebase.auth().currentUser.getIdToken(true) // here we force a refresh
                        .then(function(token) {
                            localStorage.setItem("token", token);
                        }).catch(function(error) {
                        if (error) throw error
                    });
                } else {
                  // No user is signed in.
                  alert("User not signed in!");
                }
              });
            },
            600000, //10 mins
        );
            
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
       
        axios.get('https://projectservice-zode.herokuapp.com/api/projects/getprojects', config)
        .then((res) => {
    
            if(res.status === 200) {
                
                const Data = res.data;
                //const Data = Object.keys(chunk).map((key) => chunk[key]);
                
                this.setState({ apiData: Data }, () => {
                    //alert(this.state.apiData[0].projectName);
                });
              
            } else {
    
            }
        })
        .catch(function (error) {
            console.log(error);
        });         
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        return (

            <div className="BaseDashboard">

                <div className="bd-top-nav">
    
                    <div className="bd-left-wrapper">
                        <p className="bd-title">zode</p>
                    </div>
    
                    <div className="bd-mid-wrapper">
                        <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="bd-right-wrapper">
    
                        <div className="bd-profile-icon-wrapper">
    
                            <div className="bd-icon">
                                <p className="bd-icon-txt">JD</p> 
                            </div>
    
                            <div className="bd-dropdown-content">
                                <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>My Profile</p></Link>
                                <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                                <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <div className="search-etc-section">
    
                    <div className="heading-wrapper">
                        <p className="heading">PROJECTS</p>
                    </div>
    
                    <div className="search-wrapper">
                        <input type="text" className="search"></input>
                    </div>
    
                    <div className="">
                        <Link to="/basedashboard/createproject"> <input type="submit" value="New Project" className="new-project-btn"></input></Link>                     
                    </div>
                </div>
    
                <div className="status-etc-hdn">
    
                    <div className="free-box">      
                    </div>   
                                 
                    <div className="wrapper-x">
                        <p className="project-name-x">Project Name</p>
                        <p className="status-x">Status</p>
                        <p className="deadline-x">Deadline</p>
                        <p className="team-lead-x">Team Lead</p>
                    </div>
                </div>
    
                <div className="full-boxes-wrapper">


                    { !this.state.apiData ? (
                        <p>...</p> 
                    ):( this.state.apiData.map(qdata => (
                        
                        <div className="single-box-wrapper">
    
                            <div className="rocket-svg-wrapper">
                                <div className="rocket-svg">
                                
                                </div>
                            </div>
                        
                            <div className="inbox-wrapper">    
                                <div className="wrapper-y">

                                    { !this.state.apiData ? (
                                        <p className="project-name">...</p> 
                                    ):(
                                        <p className="project-name">{JSON.parse(JSON.stringify(qdata.projectName))}</p>
                                    )}

                                    <p className="status">...</p>

                                    { !this.state.apiData ? (
                                        <p className="deadline">...</p> 
                                    ):(
                                        <p className="deadline">{JSON.parse(JSON.stringify(qdata.deadline))}</p>
                                    )}

                                    { !this.state.apiData ? (
                                        <p className="team-lead">...</p> 
                                    ):(
                                        <p className="team-lead">{JSON.parse(JSON.stringify(qdata.teamlead))}</p>
                                    )}

                            </div> 
    
                            <div className="line-wrapper">
                                <div className="progress-line"></div>
                            </div> 

                        </div>
    
                    </div>                        

                    ))
                        
                    )}
    
                </div> 
                               
            </div>
        );        
    }
}