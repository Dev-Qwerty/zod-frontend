import './CreatePublicBoard.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import refreshToken from '../../functions/refreshToken';
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap-button-loader'; 
import firebase from 'firebase';

 
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
            finalMem: [{ email: "" }],
            loading: false,
            btnText: 'Create'
        }
    }

    componentDidMount(){

        refreshToken();
     
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

                const Data = res.data.projectMembers
                this.setState({ members: Data });
            } else {

            }
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            };
        });         
    }

    handleMemberInputChange = (e, index) => {

        const { name, value } = e.target;
        const list = this.state.finalMem;
        list[index][name] = value;
        
        this.setState({
            finalMem : list
        }); 
    }; 

    handleAddBtn = () => {
        
        const obj = { email: "" }
        
        this.setState({
            finalMem : [...this.state.finalMem, obj]
        });         
    }; 

    handleRemoveBtn = (index) => {

        const list = this.state.finalMem;
        list.splice(index, 1);

        this.setState({
            finalMem : list
        });     
    };

    submitFn = () => {
        this.setState({
            loading: true,
            btnText: 'Creating...'
        })
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
        refreshToken();
        axios.post(url, reqBody, config)
        .then((res) => {
    
            if(res.status === 201) {
                
                console.log(JSON.stringify(res.data))
                toast.info('Public Board Created!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        btnText: 'Created!'
                    })
                    window.location.href = window.location.protocol + '//' + window.location.host + '/projectdashboard/board/bhome';
                  }, 3000);
                
            } else {
                this.setState({
                    loading: false,
                    btnText: 'Create'
                })
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

    getProfileImageURL() {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    render() {
    
        return (
            <div className="CreatePublicBoard">
                
                <div className="public-cb-top-nav">

                    <div className="pd-left-wrapper">
                        <div className="pd-lb"><p className="pd-title" onClick={ this.backToBaseFn }>zode</p></div>
                    </div>
    
                    <div className="bd-right-wrapper">
    
                        <div className="bd-profile-icon-wrapper">

                            <div>
                                <img className="bd-icon" src = { this.getProfileImageURL() }/>
                            </div>

                        <div className="bd-dropdown-content">
                            <Link to="/basedashboard/myprofile/profile" style={{ textDecoration: 'none' }}><p>Profile</p></Link>
                            <Link to="/basedashboard/myprofile/pendinginvites" style={{ textDecoration: 'none' }}><p>Pending Invites</p></Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                        </div>
                    </div>
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

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng4" data-tip data-for="calTip"></div>
                            </Link>

                            <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng5" data-tip data-for="videoCallTip"></div>
                            </Link>
                            <div className="public-cb-lng6" data-tip data-for="noneTip"></div>
                            <div className="public-cb-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet/Video Call</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>  

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
                                <div><input type="text" placeholder="Enter Board Name" className="xcb-g1-bname-inp" value = { this.state.bname } onChange={ this.updateBname } ></input></div>
                                
                                <p className="xcb-g1-members-hdn">Add Members</p>
                                    
                                { this.state.finalMem.map((x, i) => {
                        
                                    return (
                                        <div className="xcb-box">
                                            
                                            <div className="xcb-one-row-wrapper">
        
                                                <input list="email" placeholder="Email" className="xcb-email" name="email" onChange={e => this.handleMemberInputChange(e, i)}/>
                                                
                                                <datalist id="email">
                                                    
                                                    { !this.state.members ? (
                                                        <option value = "Loading..." />

                                                    ):( this.state.members.map((memdata, j) => (
                                                        <option value = { JSON.parse(JSON.stringify(memdata.email)) } />
                                                    )))}

                                                </datalist>
            
                                                <span className="xcb-btn-box">
                                                    { this.state.finalMem.length !== 1 && <button onClick={() => this.handleRemoveBtn(i) } className="xcb-remove-btn">Remove</button>}
                                                    { this.state.finalMem.length - 1 === i && <button onClick={ this.handleAddBtn } className="xcb-add-btn">New</button>}
                                                </span>
                                            </div>

                                        </div>
                                    );
                                })} 

                                <Button variant="success" loading={this.state.loading} className="xcb-g1-submit" onClick={ this.submitFn }>{this.state.btnText}</Button>                                                                              
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