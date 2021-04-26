import './CmpProfile.css';
import { Link } from "react-router-dom";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CmpProfile  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            fname: 'Zack',
            lname: 'Snyder',
            fnameChange: false,
            lnameChange: false
        }
    }     

    render() {        

        return (
            <div className="MyProfile">

                <div className="mp-wrapper">
                    
                    <div className="mp-profile-img"></div>
                    
                    <div className="mp-inp-wrapper">    

                        <div className="mp-x">

                            <div className="mp-class1">
                                
                                <div className="mp-fname">
                                    <p className="mp-name-label">First Name</p>
                                    <div><input type="text" placeholder=""  className="mp-name-inp1" value={this.state.fname} onChange={evt => this.updateFname(evt)}></input></div>
                                </div>
                                
                                <div className="mp-lname">
                                    <p className="mp-name-label">Last Name</p>
                                    <div className="mp-name-inp"><input type="text" placeholder=""  className="mp-name-inp2" value={this.state.lname} onChange={evt => this.updateLname(evt)}></input></div>
                                </div>
                            </div>

                            <div className="mp-class2">
                                <p className="mp-email">Email</p>
                                <div><input type="text" placeholder="" className="mp-email-inp" disabled></input></div>                            
                                <div><input value="Update Profile" type="submit" className="mp-update-btn" onClick = { this.updateProfile } ></input></div> 
                                <div><input value="Delete Account" type="submit" className="mp-delete-btn"onClick = { this.deleteAccount } ></input></div> 
                            </div>

                            <ToastContainer />
                        </div>            
                    </div>

                </div>
            </div>
        );
    }

    updateFname = (evt) => {

        this.setState({
            fname: evt.target.value,
            fnameChange: true
          });
    }    

    updateLname = (evt) => {

        this.setState({
            lname: evt.target.value,
            lnameChange: true
          });     
    } 
    
    updateProfile = () => {

        if(this.state.fnameChange == true && this.state.lnameChange == true) {
            alert('fname  and lname changed!')
        } else if(this.state.fnameChange == true) {
            alert('only fname changed')
        } else if(this.state.lnameChange == true){
            alert('only lname changed')
        } else {
            alert('no change')
        }
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
 
    deleteAccount = () => {
            
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
}