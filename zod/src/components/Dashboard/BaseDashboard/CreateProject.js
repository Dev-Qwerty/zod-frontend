import './CreateProject.css';
import { Link } from "react-router-dom";

function CreateProject() {
    return (
        <div className="createPro">   

            <div className="cp-top-nav">
                <div className="cp-left-wrapper-tn">
                    <p className="cp-title">zode</p>
                </div>

                <div className="base-mid-wrapper">
                    <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                </div>

                <div className="cp-right-wrapper-tn">  
                    <div className="cp-dropdown">
                        <button className="cp-dropbtn">
                            <p className="cp-profile-text">JD</p> 
                        </button>

                        <div className="cp-dropdown-content">
                            <Link to="/basedashboard/myprofile"><p>My Profile</p></Link>
                            <Link to="/basedashboard/home"><p>Home</p></Link>
                            <Link to="/login"><p>Logout</p></Link>
                        </div>
                    </div>
                </div>
            </div>        

            <div className="cp-outermostbox">
                <div className="cp-box-hdn">
                    <p>Create New Project</p>
                </div>
                <div className="cp-box-contents">
                    <div className="zod-login-inputs">
                        <input type="text" placeholder="Project Name"></input>
                        <input type="text" placeholder="Deadline"></input>
                        <input type="submit" value="Add Member" className=""/>
                        <input type="submit" value="Submit" className=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProject;