import './CmpProfile.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect } from 'react';
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
            fname: '',
            lname: '',
            email: '',
            valx: false,
            fnameChange: false,
            lnameChange: false
        }   

    }   
    
    componentDidMount(){
     
        const token1 = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        axios.get('https://userservice-zode.herokuapp.com/api/user/', config)
        .then((res) => {
    
            if(res.status === 200) {
                this.setState({
                    fname: res.data.fname,
                    lname: res.data.lname,
                    email: res.data.email,
                    valx: true
                  });
            } else {

            }
        })
        .catch(function (error) {
            console.log(error);
        });         
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
                  
                    <div className="mp-profile-img"></div>
                    
                    <div className="mp-inp-wrapper">    

                        <div className="mp-x">

                            <div className="mp-class1">
                                
                                <div className="mp-name">
                                    <p className="mp-name-label">Name</p>
                                    <div><input type="text" placeholder=""  className="mp-name-inp1" value={this.state.fname} onChange={evt => this.updateFname(evt)}></input></div>
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
            
            const token = localStorage.getItem('token');

            const reqBody = {
                "fname": this.state.fname,
                "lname": this.state.lname
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
                    
                    toast.info('First & Last Name Changed!', {
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
                console.log(error);
            }); 

        } else if(this.state.fnameChange == true) {
            
            const token = localStorage.getItem('token');
    
            const reqBody = {
                "fname": this.state.fname,
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
                    
                    toast.info('First Name Changed!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.setState({
                        fnameChange: false
                    }); 

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
                console.log(error);
            }); 

        } else if(this.state.lnameChange == true){
            
            const token = localStorage.getItem('token');
    
            const reqBody = {
                "lname": this.state.lname
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
                    
                    toast.info('Last Name Changed!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.setState({
                        lnameChange: false
                    }); 

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
                console.log(error);
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