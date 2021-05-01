import './ProjectD.css';
import { Link } from "react-router-dom";
import React from 'react';
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class ProjectD extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: ''
        }
    }

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    render() {
    
        return (
            <div className="ProjectD">
                
                <div className="pd-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lt" onClick={ this.backToBaseFn }>
                            <div className="pd-arrow"></div>
                            <div><p className="pd-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="pd-lb"><p className="pd-title">zode</p></div>
                    </div>
    
                    <div className="pd-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="pd-right-wrapper">
                        <input type="submit" value="Logout" className="pd-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="pd-body-wrapper">

                    <div className="pd-left-nav">
                        
                        <div className="pd-left-nav-grid">
                            
                            <div className="pd-lng1-wrapper">
                                <div className="pd-lng1"></div>
                            </div>
                            <div className="pd-lng2"></div>
                            <div className="pd-lng3"></div>
                            <div className="pd-lng4"></div>
                            <div className="pd-lng5"></div>
                            <div className="pd-lng6"></div>
                            <div className="pd-lng7"></div>
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">

                            <div className="pdb-hdn-left">
                                <div className="pdb-hl-1"><p>Final Year Project&nbsp;🚀</p></div>
                                <div className="pdb-hl-2"><p>Team Lead: John Doe</p></div>
                            </div>

                            <div className="pdb-hdn-right">
                                <div className="pdb-hr-1"><p>Due By: 30-June-2021</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}