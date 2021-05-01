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

    render() {
    
        return (
            <div className="ProjectD">
                
                <div className="pd-top-nav">
    
                    <div className="pd-left-wrapper">
                        <div className="pd-lt">
                            <div className="pd-arrow"></div>
                            <div><p className="pd-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="pd-lb"><p className="pd-title">zode</p></div>
                    </div>
    
                    <div className="pd-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="pd-right-wrapper">
                        <input type="submit" value="Logout" className="pd-logout-btn"></input>
                    </div>
    
                </div>

            </div>
        );
    }
}