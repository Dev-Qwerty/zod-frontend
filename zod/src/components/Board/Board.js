import './Board.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import refreshToken from '../../functions/refreshToken';
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase';

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class Board extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: '',
            pname: '',
            personalArr: [],
            publicArr: []
        }
    }

    componentDidMount(){
     
        const user = firebase.auth().currentUser
        if (user) {
            localStorage.setItem('photoURL', user.photoURL);

        } else {
            // Not Signed-in
        }

        refreshToken();

        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'));

        this.setState({
            pname : obj.projectName
        }); 

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

                const dat = res.data;
                
                for (const [index, value] of dat.entries()) {
                    
                    if(value.type == 'private') {
                        
                        this.setState({
                            personalArr : [...this.state.personalArr, value]
                        }); 
                    } else {

                        this.setState({
                            publicArr : [...this.state.publicArr, value]
                        }); 
                    }
                }

                /*alert(JSON.stringify(this.state.personalArr));
                alert(JSON.stringify(this.state.publicArr));*/

            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });         
    }

    personalFn = (obj) => {
    
        console.log(obj);
        localStorage.setItem('boardobj', JSON.stringify(obj));
        window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/board/card';   
    }

    publicFn = (obj) => {

        console.log(obj);
        localStorage.setItem('boardobj', JSON.stringify(obj));
        window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/board/card';
    }

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    // delete board
    deleteFn = (bobj) => {

        const pobj = JSON.parse(localStorage.getItem('pdata'));
        const tokeny = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': tokeny,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
      
        const reqBody = {
            "boardId": bobj.boardId,
            "projectId": pobj.projectID
        }

        //alert(JSON.stringify(reqBody));

        const url = 'https://boardservice-zode.herokuapp.com/api/board/delete';

        axios.post(url, reqBody, config)
        .then((res) => {
    
            if(res.status === 200) {               

                toast.info('Board Deleted!', {
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
          
            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });   

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

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="b-lng4" data-tip data-for="calTip"></div>
                            </Link>
                            
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
                            <p>Project Name: { this.state.pname }</p>
                        </div>
                        <div className="bb-proLine"></div>

                        <div className="bb-wrapper">
                            
                            <div className="bb-personalB">

                                <p className="bbPersonal-hdn">Personal Boards</p>
                                
                                <div className="bbPersonal-card-wrapper">

                                    { !this.state.personalArr ? (
                                    
                                        <div className="gx-loading">
                                            <p>Loading...</p>
                                        </div>                                    

                                    ):( this.state.personalArr.map((pdat, i) => (
                                        
                                        <div className="bbPersonal-card">
                                            <div className="bbPersonal-delete" onClick = { () => this.deleteFn(pdat) }></div>
                                            <div className="bbPersonal-parag" onClick = { () => this.personalFn(pdat) }>
                                                <p>{ JSON.parse(JSON.stringify(pdat.boardName)) }</p>
                                            </div>
                                        </div>   
                                    )))}   
                                    
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
                                    
                                    { !this.state.publicArr ? (
                                        
                                        <div className="gx-loading">
                                            <p>Loading...</p>
                                        </div>                                    

                                    ):( this.state.publicArr.map((tdat, i) => (
                           
                                        <div className="bbPublic-card">
                                            <div className="bbPublic-delete" onClick = { () => this.deleteFn(tdat) }></div>
                                            <div className="bbPublic-parag" onClick = { () => this.publicFn(tdat) }>
                                                <p>{ JSON.parse(JSON.stringify(tdat.boardName)) }</p>
                                            </div>                                            
                                        </div>                                         
                                    )))}    
                                      
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