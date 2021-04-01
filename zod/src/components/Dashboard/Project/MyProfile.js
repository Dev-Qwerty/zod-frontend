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
                    <div className="mp-dropdown">
                        <button className="mp-dropbtn">
                            <p className="mp-profile-text">JD</p> 
                        </button>

                        <div className="mp-dropdown-content">
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