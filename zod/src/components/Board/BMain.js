import './BMain.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import refreshToken from '../../functions/refreshToken';
import ReactTooltip from "react-tooltip";
import Draggable from 'react-draggable';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

let proData = JSON.parse(localStorage.getItem('pdata'));
const API = 'https://boardservice-zode.herokuapp.com/'+ proData.projectID + '/boards';

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class BMain extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: '',
            listBool: false,
            listDat: '',
            listTitle: ''
        }
    }

    componentWillUnmount() {
        
    }

    componentDidMount() {

        refreshToken();
        const obj = JSON.parse(localStorage.getItem('boardobj'));

        const socket = io(API, {
            auth: {
                Authorization: localStorage.getItem('token')
            }
        });
        
        socket.on("connection", (data) => {
          this.socket.emit("joinRoom", obj.boardId);
        });

        this.fetchListCard();
    }

    fetchListCard = () => {
      
        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('boardobj'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://boardservice-zode.herokuapp.com/api/board/lists/' + obj.boardId;
    
        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {
                
                const dat = res.data;

                this.setState({
                    listDat : dat.lists
                });  
                //alert(JSON.stringify(this.state.listDat));         
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });        
    }

    updateListTitle = (evt) => {
        this.setState({
            listTitle: evt.target.value
        });
    }

    createListFn = () => {

        if(this.state.listDat.length == 0) {
            
            // Random No
            const min = 500;
            const max = 1000;
            const rand = min + Math.random() * (max - min);
            const roundR = Math.round(rand); 
            console.log(roundR);
        
            // Axios POST
            const tokenx = localStorage.getItem('token');
            const obj = JSON.parse(localStorage.getItem('boardobj'));
    
            const config = {
                headers: {
                    'Authorization': tokenx,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                }
            }
        
            const reqBody = {
                "title": this.state.listTitle,
                "pos": roundR,
                "boardId": obj.boardId
            }
         
            let url = 'https://boardservice-zode.herokuapp.com/api/' + obj.boardId + '/list/new';
            
            axios.post(url, reqBody, config)
            .then((res) => {
        
                if(res.status === 201) {
                    
                    //console.log(res.data);
                    this.clistCloseFn();

                    toast.info('List Created!', {
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


        } else {

            
            // add 1045 to last obj pos
            const lastObj = this.state.listDat[this.state.listDat.length - 1];
            const lastPos = lastObj.pos; 
            const num = 1045;
            const newPos = lastPos + num;
            console.log(newPos);

            // Axios POST
            const tokenx = localStorage.getItem('token');
            const obj = JSON.parse(localStorage.getItem('boardobj'));
    
            const config = {
                headers: {
                    'Authorization': tokenx,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                }
            }
        
            const reqBody = {
                "title": this.state.listTitle,
                "pos": newPos,
                "boardId": obj.boardId
            }
         
            let url = 'https://boardservice-zode.herokuapp.com/api/' + obj.boardId + '/list/new';
        
            //alert(JSON.stringify(reqBody));

            axios.post(url, reqBody, config)
            .then((res) => {
        
                if(res.status === 201) {
                    
                    //console.log(res.data);
                    this.clistCloseFn();

                    toast.info('List Created!', {
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
    
    }

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    clistBoolFn = () => {
        this.setState({
            listBool : true
        }); 
    } 

    clistCloseFn = () => {
        this.setState({
            listBool : false
        }); 
    }

    render() {
        
        return (
            <div className="Card">
                
                <div className="c-top-nav">

                    <div className="c-left-wrapper">
                        <div className="c-lt" onClick={ this.backToBaseFn }>
                            <div className="c-arrow"></div>
                            <div><p className="c-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="c-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="c-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="c-right-wrapper">
                        <input type="submit" value="Logout" className="c-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="c-body-wrapper">

                    <div className="c-left-nav">
                        
                        <div className="c-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="c-lng1-wrapper">
                                    <div className="c-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="c-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="c-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="c-lng4" data-tip data-for="calTip"></div>
                            <div className="c-lng5" data-tip data-for="calTip"></div>
                            <div className="c-lng6" data-tip data-for="calTip"></div>
                            <div className="c-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="c-body">
                        
                        <div className="cb-wrapper">

                            <div className="">
                                <input type="submit" value="New List" className="cb-new-list-btn" onClick = { this.clistBoolFn }></input>
                            </div>

                            <div className="cb-list-wrapper">

                                { !this.state.listDat ? (
                                                                        
                                    <div className="BM-loading">
                                        <p>Loading...</p>
                                    </div>

                                ):( this.state.listDat.map((litem, i) => (
                                
                                    <div className="cb-list">

                                        <div className="cbl-h">
                                            <div className="cblh-wr">
                                                <div className="cblh-p"><p>{ JSON.parse(JSON.stringify( litem.title )) }</p></div>
                                                <div className="cblh-plus"></div>
                                            </div>
    
                                            <div className="cblh-line"></div>
                                        </div>

                                        <div className="cbl-spec-card">
                                            <p>Empty!</p>
                                        </div>

                                        {/*<div className="cbl-card">
                                            <div className="cblc-taskname">
                                                <p>Task Name</p>
                                            </div>
                                            
                                            <div className="cblc-wr">
                                                <div className="cblc-profile"><p>JD</p></div>
                                                <div><p className="cblc-date">20-5-2021</p></div>
                                            </div>
                                        </div>*/}
                                    </div>
                                )))}    

                            </div>
    
                        </div>

                    </div>
                </div>

                { this.state.listBool ? (
                    
                    <div className="clist-wrapper">
                        
                        <div className="cl-body">
                            
                            <div className="cl-close" onClick = { this.clistCloseFn }></div>
                            
                            <p className="clb-namep">List Name</p>
                            <div><input type="text" placeholder="List Name" className="clb-nameinp" onChange={ this.updateListTitle }></input></div>
                            
                            <div><input type="submit" value="Create" className="clb-submit" onClick = { this.createListFn }></input></div>                           
                    
                        </div>
                    </div>                    
                ):(
                    <p></p>
                )}               

            </div>
        );
    }
}