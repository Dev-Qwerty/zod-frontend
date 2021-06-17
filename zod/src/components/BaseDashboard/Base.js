import './Base.css';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import firebase from 'firebase';
import refreshToken from '../../functions/refreshToken';
import newProjectSVG from '../../assets/newProject.svg';
import CirclesLoader from '../Loader/CirclesLoader';
//import loader from '../Loader/Loader'

export default class BaseDashboard  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            apiData: null,
            isEmpty: false,
            avatar: ''
        }
    }   
    async componentDidMount() {
        this.getProfileImageURL();
        refreshToken(); 

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
                this.setState({ apiData: Data });
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

    getProfileImageURL() {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    componentWillUnmount() {
       
    }

    render() {

        return (

            <div className="BaseDashboard">

                <div className="bd-top-nav">
    
                    <div className="bd-left-wrapper">
                        <p className="bd-title">zode</p>
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
    
                <div className="hdn">
    
                    <div className="free-box">      
                    </div>   
                                 
                    <div className="wrapper-x">
                        <p className="project-name-x">Project Name</p>
                        <p className="deadline-x">Deadline</p>
                        <p className="team-lead-x">Team Lead</p>
                    </div>
                </div>
    
                <div className="full-boxes-wrapper">
                { !this.state.apiData ? (        
                        this.state.isEmpty ? (
                            <div className="x-empty">
                                <img src={newProjectSVG} className="bd-new-svg"></img>
                                <span>No projects found! Create a new project <Link to="/basedashboard/createproject">here.</Link></span>
                            </div>
                        ): (
                            <div className="x-loading">
                                <CirclesLoader />
                            </div>
                        )                        
                    ):( this.state.apiData.map(qdata => (
                        
                        <div className="single-box-wrapper" onClick={ () => this.boxfn(qdata) }>
    
                            <div className="rocket-svg-wrapper">
                                <div className="rocket-svg"></div>
                            </div>
                        
                            <div className="inbox-wrapper">    
                                <div className="wrapper-y">

                                    <p className="project-name">{JSON.parse(JSON.stringify(qdata.projectName))}</p>
                                    <p className="deadline">{JSON.parse(JSON.stringify(qdata.deadline))}</p>
                                    <p className="team-lead">{JSON.parse(JSON.stringify(qdata.teamlead))}</p>
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

    boxfn = function(data) {
        localStorage.setItem('pdata', JSON.stringify(data));
        window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/home';
    }
}