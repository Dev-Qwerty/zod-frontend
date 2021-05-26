import './Board.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import axios from 'axios';
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class Board extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: ''
        }
    }

    componentDidMount(){
     
        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://boardservice-zode.herokuapp.com/api/board/' + obj.projectID;

        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {

                alert(JSON.stringify(res.data));
            } else {

            }
        })
        .catch(function (error) {
            console.log(error);
        });         
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
            <div className="Board">
                
                <div className="b-top-nav">

                    <div className="b-left-wrapper">
                        <div className="b-lt" onClick={ this.backToBaseFn }>
                            <div className="b-arrow"></div>
                            <div><p className="b-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="b-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="b-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="b-right-wrapper">
                        <input type="submit" value="Logout" className="b-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="b-body-wrapper">

                    <div className="b-left-nav">
                        
                        <div className="b-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="b-lng1-wrapper">
                                    <div className="b-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="b-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="b-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="b-lng4" data-tip data-for="calTip"></div>
                            <div className="b-lng5" data-tip data-for="calTip"></div>
                            <div className="b-lng6" data-tip data-for="calTip"></div>
                            <div className="b-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="b-body">
                        
                        <div className="bb-proname">
                            <p>Project Name</p>
                        </div>
                        <div className="bb-proLine"></div>

                        <div className="bb-wrapper">
                            
                            <div className="bb-personalB">

                                <p className="bbPersonal-hdn">Personal Boards</p>
                                
                                <div className="bbPersonal-card-wrapper">
                                    
                                    <Link to="/projectdashboard/board/card" style={{ textDecoration: 'none' }}>
                                        <div className="bbPersonal-card">
                                            <p className="bbPersonal-parag">Test Board</p>
                                        </div>
                                    </Link>    
                                    
                                    <div className="bbPersonal-card">
                                        <p className="bbPersonal-parag">Test Board</p>
                                    </div>   
                                    
                                    <Link to="/projectdashboard/board/personal/create" style={{ textDecoration: 'none' }}>
                                        <div className="bbPersonal-special-card">
                                            <div className="bbPersonal-xy">
                                                <div className="bbPersonal-plus"></div>
                                                <div><p className="bbPersonal-new-parag">New Board</p></div>
                                            </div>
                                        </div>    
                                    </Link>                                                           
                                
                                </div>
                            </div>

                            <div className="bb-publicB">
                                
                                <p className="bbPublic-hdn">Public Boards</p>
                                
                                <div className="bbPublic-card-wrapper">
                                    
                                    <div className="bbPublic-card">
                                        <p className="bbPublic-parag">Test Board</p>
                                    </div>
                                    
                                    <div className="bbPublic-card">
                                        <p className="bbPublic-parag">Test Board</p>
                                    </div>   
                                    
                                    <Link to="/projectdashboard/board/public/create" style={{ textDecoration: 'none' }}>
                                        <div className="bbPublic-special-card">
                                            <div className="bbPublic-xy">
                                                <div className="bbPublic-plus"></div>
                                                <div><p className="bbPublic-new-parag">New Board</p></div>
                                            </div>
                                        </div>                                                               
                                    </Link>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}