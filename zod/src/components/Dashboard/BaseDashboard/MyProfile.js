import './MyProfile.css';
import { Link } from "react-router-dom";

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function MyProfile() {
    return (
        <div className="MyProfile">   

            <div className="mp-top-nav">
                <div className="mp-left-wrapper-tn">
                    <p className="mp-title">zode</p>
                </div>

                <div className="base-mid-wrapper">
                    <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                </div>

                <div className="mp-right-wrapper-tn">  
                    <div className="mp-dropdown">
                        <button className="mp-dropbtn">
                            <p className="mp-profile-text">JD</p> 
                        </button>

                        <div className="mp-dropdown-content">
                            <Link to="/basedashboard/home"><p>Home</p></Link>
                            <Link to="/login"><p>Logout</p></Link>
                        </div>
                    </div>
                </div>
            </div>        
    
            <div className="mp-outermostbox">
                <div className="mp-box-hdn">
                    <p>My Profile</p>
                </div>
                <div className="mp-box-contents">
                    <p>Name:&nbsp;&nbsp;&nbsp;Zack Snyder</p>
                    <p>Email ID:&nbsp;&nbsp;&nbsp;snyderzack@gmail.com</p>
                    <p>Current Projects:</p>
                </div>
            </div>
            
        </div>
    );
}

export default MyProfile;