import './PendingInvites-MyProfile.css';
import { Link } from 'react-router-dom';
import CmpPI from './CmpPending'
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function MyProfilePI() {

    return (
        <div className="MyProfilePI">   

            <div className="mp-top-nav">

                <div className="mp-left-wrapper">
                    <p className="bd-title">zode</p>
                </div>

                <div className="mp-mid-wrapper">
                    <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                </div>

                <div className="mp-right-wrapper">

                    <div className="mp-profile-icon-wrapper">

                        <div className="mp-icon">
                            <p className="mp-icon-txt">JD</p> 
                        </div>

                        <div className="mp-dropdown-content">
                            <Link to="/basedashboard/home" style={{ textDecoration: 'none' }}><p>Home</p></Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                        </div>
                    </div>
                </div>

            </div>        
    
            <div className="mp-body">
                <div className="mpb-col1">
                    <div className="mpb-col1-items">
                        <div className="mpb-col1-item1">
                            <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p className="p-label">Profile</p></Link>
                        </div>
                        <div className="mpb-col1-item2">
                            <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p className="p-label">Pending Invites</p></Link>
                        </div>
                    </div>
                </div>
                <div className="mpb-col2">
                    <CmpPI />
                </div>
            </div>
            
        </div>
    );
}

export default MyProfilePI;