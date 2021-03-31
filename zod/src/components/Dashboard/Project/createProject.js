import './CreateProject.css';
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

function CreateProject() {
    return (
        <div className="createPro">   

            <div className="cp-top-nav">

                <div className="cp-left-wrapper-tn">
                    <p className="cp-title">zode</p>
                </div>

                <div className="cp-right-wrapper-tn">  
                    <div class="cp-dropdown">
                        <button class="cp-dropbtn">
                            <p className="cp-profile-text">JD</p> 
                        </button>

                        <div class="cp-dropdown-content">
                            <Link to="/dashboard/myprofile"><p>My Profile</p></Link>
                            <Link to="/dashboard/project"><p>Dashboard</p></Link>
                            <Link to="/login"><p>Logout</p></Link>
                        </div>

                    </div>
                </div>
            </div>        

            <div>
                <h1></h1>
            </div>
            
        </div>
    );
}

export default CreateProject;