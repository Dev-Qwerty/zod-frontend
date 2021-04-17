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
            </div>
        </div>
    );
}

export default CmpProfile;