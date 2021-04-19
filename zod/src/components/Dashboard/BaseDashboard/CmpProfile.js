import './CmpProfile.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function CmpProfile() {

    const upadteProfile = () => {

        toast.info('Project Updated!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });     
    }

    const deleteAccount = () => {
        
        toast.error('Account Deleted!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });     
    }    

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
                            <div><input value="Update Profile" type="submit" className="mp-update-btn" onClick = { upadteProfile } ></input></div> 
                            <div><input value="Delete Account" type="submit" className="mp-delete-btn"onClick = { deleteAccount } ></input></div> 
                        </div>

                        <ToastContainer />
                    </div>            
                </div>

            </div>
        </div>
    );
}

export default CmpProfile;