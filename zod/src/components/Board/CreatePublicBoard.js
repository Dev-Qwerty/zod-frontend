import './CreatePublicBoard.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CreatePublicBoard extends React.Component {

    constructor() {
     
        super();
        this.state = {
            bname: '',
            members: '',
            finalMem: []
        }
    }

    componentDidMount(){
     
        const token1 = localStorage.getItem('token');
        const obj = JSON.parse(localStorage.getItem('pdata'))

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://projectservice-zode.herokuapp.com/api/projects/' + obj.projectID + '/members';

        axios.get(url, config)
        .then((res) => {
    
            if(res.status === 200) {

                /*alert(JSON.stringify(res.data.projectMembers))*/
                const Data = res.data.projectMembers
                this.setState({ members: Data });
            } else {

            }
        })
        .catch(function (error) {
            console.log(error);
        });         
    }

    addMem = (email) => {

        if(!(this.state.finalMem.indexOf(email) > -1)) {

            const obj = { 'email': email };
            this.setState({
                finalMem : [...this.state.finalMem, obj]
              });          
        } 
    }
    
    removeMem = (email) => {

        const fn = (element) => element.email == email;
        let i = this.state.finalMem.findIndex(fn);
        this.state.finalMem.splice(i, 1);
    }

    showlist = () => {
        console.log(this.state.finalMem)
        alert(JSON.stringify(this.state.finalMem))
    }

    submitFn = () => {
    
        const tokenx = localStorage.getItem('token');
        const xobj = JSON.parse(localStorage.getItem('pdata')); 

        const config = {
            headers: {
                'Authorization': tokenx,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        const reqBody = {
            "boardName": this.state.bname,
            "members": this.state.finalMem,
            "type": "public",
            "projectName": xobj.projectName,
            "projectId": xobj.projectID
        }

        let url = 'https://boardservice-zode.herokuapp.com/api/board/new';

        axios.post(url, reqBody, config)
        .then((res) => {
    
            if(res.status === 201) {
                
                console.log(JSON.stringify(res.data))
                toast.info('Board Created!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/board/bhome';
                  }, 3000);
                
            } else {

                toast.error('Some Error Occured!', {
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

    updateBname = (evt) => {
        this.setState({
            bname: evt.target.value
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
            <div className="CreatePublicBoard">
                
                <div className="public-cb-top-nav">

                    <div className="public-cb-left-wrapper">
                        <div className="public-cb-lt" onClick={ this.backToBaseFn }>
                            <div className="public-cb-arrow"></div>
                            <div><p className="public-cb-lt-txt">Back to Base Dashboard</p></div>
                        </div>
                        <div className="public-cb-lb"><p className="b-title">zode</p></div>
                    </div>
    
                    <div className="public-cb-mid-wrapper">
                        <p>PROJECT&nbsp;&nbsp;DASHBOARD</p>
                    </div>
    
                    <div className="public-cb-right-wrapper">
                        <input type="submit" value="Logout" className="public-cb-logout-btn" onClick = { this.logout }></input>
                    </div>
    
                </div>

                <div className="public-cb-body-wrapper">

                    <div className="public-cb-left-nav">
                        
                        <div className="public-cb-left-nav-grid">
                            
                            <Link to="/projectdashboard/home" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng1-wrapper">
                                    <div className="public-cb-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/createChannel" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <div className="public-cb-lng4" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng5" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng6" data-tip data-for="calTip"></div>
                            <div className="public-cb-lng7" data-tip data-for="calTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="public-cb-body">

                        <div className="xcb-proname">
                            <p>Create Public Board</p>
                        </div>

                        <div className="xcb-proLine"></div>

                        <div className="xcb-gridWrx">

                            <div className="xcb-g1">
                                    
                                <p className="xcb-g1-bname-label">Board Name</p>
                                <div><input type="text" placeholder="" className="xcb-g1-bname-inp" value={ this.state.bname } onChange={ this.updateBname } ></input></div>
                                
                                <p className="xcb-g1-checkbox-hdn">Add Members</p>

                                { !this.state.members ? (
                                    
                                    <div className="bx-loading">
                                        <p>Loading...</p>
                                    </div>                                    

                                ):( this.state.members.map((memdata, i) => (    

                                    <div className="xcb-g1-c-wrx">

                                        <div className="xcb-g1-c">

                                            <div className="mem-email"><p>{JSON.parse(JSON.stringify(memdata.email)) }</p></div>
                                            <div className="add-wrx"><input type="submit" value="" className="Addx" onClick={ () => this.addMem(memdata.email) }/></div>
                                            <div className="remove-wrx"><input type="submit" value="" className="Removex" onClick={ () => this.removeMem(memdata.email) }/></div>                                            
                                        </div>
                                    
                                    </div>

                                )))}    
                            
                                <div>
                                    <input className="xcb-show-list" type="submit" value="Show List" onClick = { this.showlist } />
                                </div>

                                <div><input type="submit" value="Create" className="xcb-g1-submit" onClick = { this.submitFn } ></input></div>                                                                             
                                
                            </div>
                            
                            <div className="xcb-g2">
                                <div className="xcb-pic"></div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}