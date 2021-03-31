import './Project.css';
import { Link } from "react-router-dom";
 
function ProjectPg() {
    return (
        <div className="ProjectPg">
            <div className="top-nav">
                <div className="left-wrapper-tn">
                    <p className="title">zode</p>
                </div>

                <div className="right-wrapper-tn">
                    <div className="profile-circle">
                        <p className="profile-text">JD</p>
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
                    <Link to="/dashboard/create-project"> <input type="submit" value="New Project" className="new-project-btn"></input></Link>                     
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

export default ProjectPg;