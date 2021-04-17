import './CmpProfile.css';
import { Link } from "react-router-dom";

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function CmpProfile() {
    return (
        <div className="MyProfile">

            <div className="mp-wrapper">
                
                <div className="mp-profile-img"></div>
                
                <div className="mp-inp-wrapper">        
                    <div className="mp-x">
                        <p className="mp-label">Current Password</p>
                        <div><input type="text" placeholder="" className="mp-inp"></input></div>
                        <p className="mp-label">New Password</p>
                        <div><input type="text" placeholder="" className="mp-inp"></input></div>
                        <p className="mp-label">Confirm New Password</p>
                        <div><input type="text" placeholder="" className="mp-inp"></input></div>                    
                        <div><input value="Update Password" type="submit" className="mp-submit"></input></div>   
                    </div>            
                </div>

            </div>
        </div>
    );
}

export default CmpProfile;