import './MyProfile.css';
import { Link } from "react-router-dom";

function MyProfile() {
    return (
        <div className="MyProfile">   

            <div className="mp-top-nav">
                <div className="mp-left-wrapper-tn">
                    <p className="mp-title">zode</p>
                </div>

                <div className="mp-right-wrapper-tn">  
                    <div class="mp-dropdown">
                        <button class="mp-dropbtn">
                            <p className="mp-profile-text">JD</p> 
                        </button>

                        <div class="mp-dropdown-content">
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

export default MyProfile;