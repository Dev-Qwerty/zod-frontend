import './CmpProfile.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';
import refreshToken from '../../../functions/refreshToken';

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CmpProfile  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            name: '',
            email: '',
            avatar: '',
            valx: false,
            nameChange: false,
        }   

    }   
    
    componentDidMount(){

        const user = firebase.auth().currentUser
        if (user) {
            console.log(user.displayName);
            console.log(user.email);
            console.log(user.photoURL);

            this.setState({
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                valx: true
            });
        } else {
            // Not Signed-in
        } 

        refreshToken();
    }

    render() {        

        return (
            <div className="MyProfile">

                <div className="mp-wrapper">
                    
                    { !this.state.valx ? (
                        <div className="mp-loading">
                            <p>Loading...</p>
                        </div>
                    ):(
                        <p></p>
                    )
                    }
                  
                    <div>
                        <img  className="mp-profile-img" src = { this.state.avatar }/>
                    </div>
                    
                    <div className="mp-inp-wrapper">    

                        <div className="mp-x">

                            <div className="mp-class1">
                                
                                <div className="mp-name">
                                    <p className="mp-name-label">Name</p>
                                    <div><input type="text" placeholder=""  className="mp-name-inp1" value={this.state.name} onChange={evt => this.updateName(evt)}></input></div>
                                </div>
                            
                            </div>

                            <div className="mp-class2">
                                <p className="mp-email">Email</p>
                                <div><input type="text" placeholder="" className="mp-email-inp" value={this.state.email} disabled></input></div>                            
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

    updateName = (evt) => {

        this.setState({
            name: evt.target.value,
            nameChange: true
          });
    }    
    
    updateProfile = () => {

        if(this.state.nameChange == true ) {
            
            const token = localStorage.getItem('token');

            const reqBody = {
                "name": this.state.name,
            }

            const config = {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                }
            }
        
            axios.put('https://userservice-zode.herokuapp.com/api/user/update', reqBody, config)
            .then((res) => {
        
                if(res.status === 200) {
                    
                    toast.info('Name Changed!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    
                    this.setState({
                        lnameChange: false,
                        fnameChange: false
                    }); 

                    setTimeout(() => {
                        window.location.reload();
                      }, 4000);                    

                } else {
                    toast.warning('Error!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });  
                }
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    refreshToken();
                }
            }); 

        } else {
            alert('Nothing Updated!')
        }     
    }      
 
    deleteAccount = () => {

        var r = window.confirm("Confirm: Delete Account");
        if(r == true) {
            toast.error('Account Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
        } else {

        } 
    
    }     
}