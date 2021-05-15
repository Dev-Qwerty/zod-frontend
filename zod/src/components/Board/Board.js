import './Board.css';
import { Link, Route } from "react-router-dom";
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
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng1-wrapper">
                                    <div className="pd-lng1"></div>
                                </div>
                            </Link>  
                            <Link to="/basedashboard/home" style={{ textDecoration: 'none' }}><div className="pd-lng2"></div></Link>
                            <Route render={({history})=> (<div className="pd-lng3" onClick={()=>{ history.push("/chat/createChannel")}}></div>)}></Route>
                            <div className="pd-lng4"></div>
                            <div className="pd-lng5"></div>
                            <div className="pd-lng6"></div>
                            <div className="pd-lng7"></div>
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">
                            <p>BOARD!</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}