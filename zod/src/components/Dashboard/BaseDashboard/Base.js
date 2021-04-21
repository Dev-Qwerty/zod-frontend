import './Base.css';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class BaseDashboard  extends React.Component {

    constructor(props) {
     
        super(props);
        this.state = {
            apiData: null
        }
    }   

    async componentDidMount() {

        const token = cookies.get('token');
        
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
                
                const chunk = res.data;
                const Data = Object.keys(chunk).map((key) => chunk[key]);
                
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
                                <Link to="/basedashboard/myprofile/profile"><p>My Profile</p></Link>
                                <Link to="/login"><p>Logout</p></Link>
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
                    <p>Loading...</p>
                ):(
                    <p>{JSON.parse(JSON.stringify(this.state.apiData[0].projectName))}</p>
                )}


                    <div className="single-box-wrapper">
    
                        <div className="rocket-svg-wrapper">
                            <div className="rocket-svg">
                                
                            </div>
                        </div>
                        
                        <div className="inbox-wrapper">    
                            <div className="wrapper-y">
                                <p className="project-name">Project x</p>
                                <p className="status">Tasks 2/5</p>
                                <p className="deadline">12-3-2020</p>
                                <p className="team-lead">John Doe</p>
                            </div> 
    
                            <div className="line-wrapper">
                                <div className="progress-line"></div>
                            </div> 
                        </div>
    
                    </div>
    
                    <div className="single-box-wrapper">
                        
                        <div className="rocket-svg-wrapper">
                            <div className="rocket-svg">
                                
                            </div>
                        </div>
                        
                        <div className="inbox-wrapper">
                    
                            <div className="wrapper-y">
                                <p className="project-name">Project Name 1</p>
                                <p className="status">Tasks 2/5</p>
                                <p className="deadline">12-3-2020</p>
                                <p className="team-lead">John Doe</p>
                            </div> 
    
                            <div className="line-wrapper">
                                <div className="progress-line"></div>
                            </div> 
                        </div>                  
    
                    </div>
    
                    <div className="single-box-wrapper">
                        
                        <div className="rocket-svg-wrapper">
                            <div className="rocket-svg">
                                
                            </div>
    
                        </div>
                        
                        <div className="inbox-wrapper">
                            
                            <div className="wrapper-y">
                                <p className="project-name">Project Name 1</p>
                                <p className="status">Tasks 2/5</p>
                                <p className="deadline">12-3-2020</p>
                                <p className="team-lead">John Doe</p>
                            </div> 
    
                            <div className="line-wrapper">
                                <div className="progress-line"></div>
                            </div> 
                        </div>
    
                    </div>
    
                    <div className="single-box-wrapper">
                        
                        <div className="rocket-svg-wrapper">
                            <div className="rocket-svg">
                                
                            </div>
    
                        </div>
                        
                        <div className="inbox-wrapper">
                           
                            <div className="wrapper-y">
                                <p className="project-name">Project Name 1</p>
                                <p className="status">Tasks 2/5</p>
                                <p className="deadline">12-3-2020</p>
                                <p className="team-lead">John Doe</p>
                            </div> 
    
                            <div className="line-wrapper">
                                <div className="progress-line"></div>
                            </div>
                             
                        </div>     
                    </div>    
    
                </div> 
                               
            </div>
        );        
    }
}