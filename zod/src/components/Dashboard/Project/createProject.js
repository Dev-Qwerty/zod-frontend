import './CreateProject.css';
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
                            <p>My Profile</p>
                            <p>Dashboard</p>
                            <p>Logout</p>
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