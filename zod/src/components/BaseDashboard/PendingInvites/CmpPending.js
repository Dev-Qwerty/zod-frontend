import './CmpPending.css';
import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';
import refreshToken from '../../../functions/refreshToken';
import CirclesLoader from '../../Loader/CirclesLoader';

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CmpPending  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            apiData: null,
            isEmpty: false
        }   

    }   
    
    componentDidMount(){       

        refreshToken();
     
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        axios.get('https://projectservice-zode.herokuapp.com/api/projects/invites', config)
        .then((res) => {
    
            if(res.status === 200) {
                this.setState({ apiData: res.data });
                if(res.data == null) {
                    this.setState({ isEmpty: true });
                } else {
                    this.setState({ isEmpty: false }); 
                }
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            } 
        });         
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    acceptfn(pid) {

        const atoken = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': atoken,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
        
        const reqBody = {
            "projectID": pid
        }

        axios.put('https://projectservice-zode.herokuapp.com/api/projects/acceptInvite', reqBody, config)
        .then((res) => {
    
            if(res.status === 200) {
                toast.info('Accepted!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                
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
    }

    rejectfn(pid) {

        const rtoken = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': rtoken,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
        
        const reqBody = {
            "projectID": pid
        }

        axios.put('https://projectservice-zode.herokuapp.com/api/projects/rejectinvite', reqBody, config)
        .then((res) => {
    
            if(res.status === 200) {
                toast.info('Rejected!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

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
    }
    
    render() {

        return (
            <div className="cmpPI">
    
                <div className="cpi-wrapper">

                    { !this.state.apiData ? (
                        
                        this.state.isEmpty ? (
                            
                            <div className="cpi-empty">
                                <p>No Pending Invites!</p>
                            </div>
                        ): (
                            <div className="cpi-loading">
                                <CirclesLoader />
                            </div>
                        )

                    ):( this.state.apiData.map(zdata => (

                        <div className="cpi-box">
                    
                            <div className="cpi-box-item1">
                                <div className="cpi-box-item1-wrapper">
                                    <p className="cpiY">Project Name: {JSON.parse(JSON.stringify(zdata.projectName))}</p>
                                    <p className="cpiY qw">Invited By: {JSON.parse(JSON.stringify(zdata.teamlead))}</p>
                                </div>
                            </div>
                            <div className="cpi-box-item2">
                                <div><input value="Accept" type="submit" className="cpi-acceptBtn" onClick={ () => this.acceptfn(zdata._id) }></input></div>
                            </div>
                            <div className="cpi-box-item3">
                                <div><input value="Reject" type="submit" className="cpi-rejectBtn" onClick={ () => this.rejectfn(zdata._id) }></input></div>
                            </div>
                        </div>
                    )))}             
    
                </div>
            </div>
        );
    }

}    