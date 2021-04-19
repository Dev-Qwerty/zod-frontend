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

                        <div className="mp-class1">
                            
                            <div className="mp-fname">
                                <p className="mp-name-label">First Name</p>
                                <div><input type="text" placeholder=""  className="mp-name-inp1"></input></div>
                            </div>
                            
                            <div className="mp-lname">
                                <p className="mp-name-label">Last Name</p>
                                <div className="mp-name-inp"><input type="text" placeholder=""  className="mp-name-inp2"></input></div>
                            </div>
                        </div>

                        <div className="mp-class2">
                            <p className="mp-email">Email</p>
                            <div><input type="text" placeholder="" className="mp-email-inp"></input></div>                            
                            <div><input value="Update Profile" type="submit" className="mp-update-btn"></input></div> 
                            <div><input value="Delete Account" type="submit" className="mp-delete-btn"></input></div> 
                        </div>
                    </div>            
                </div>

            </div>
        </div>
    );
}

export default CmpProfile;