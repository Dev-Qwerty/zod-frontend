import './BMain.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import refreshToken from '../../functions/refreshToken';
import ReactTooltip from "react-tooltip";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
import firebase from 'firebase';
import CirclesLoader from '../Loader/CirclesLoader';

let proData = JSON.parse(localStorage.getItem('pdata'));
let API;
if(proData!=null) {
    API = 'https://boardservice-zode.herokuapp.com/'+ proData.projectID + '/boards';
}
/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class BMain extends React.Component {

    constructor() {
     
        super();
        this.dragItem = React.createRef();
        this.state = {
            socket: io(API, { auth: { Authorization: localStorage.getItem('token') } }),
            boardName: '',
            data: '',
            listBool: false,
            cardBool: false,
            listDat: '',
            listTitle: '',
            memDatB: '',
            finalMemB: [{ name: "", email: "", imgUrl: "" }],
            cardDat: '',
            cardName: '',
            cardDesc: '',
            cardDue: '',
            cardClickBool: false,
            Dragging: false,
            avatar: '',
            cardx: '',
            isEmpty: false,
        }
    }

    componentWillUnmount() {
        
    }

    // socket + fetch list and card - GET
    componentDidMount() { 

        refreshToken();

        this.setState({
            avatar : localStorage.getItem('photoURL')
        }); 

        this.fetchListCard();

        const objB = JSON.parse(localStorage.getItem('boardobj'));

        this.setState({
            boardName : objB.boardName
        }); 

        const obj = JSON.parse(localStorage.getItem('boardobj'));
        
        // socket working ...
        this.state.socket.on('connect', data => {
            console.log('connected');
            this.state.socket.emit("joinRoom", obj.boardId);
        });

        this.state.socket.on('createList', data=> {

            if(!this.state.listDat) {
                console.log('wait');
            } else {
                
                let newList = data;
                let oldLists = this.state.listDat
                oldLists.push(newList);
    
                this.setState({
                    listDat : oldLists
                });   
            }          
        })

        this.state.socket.on('createCard', data=> {
           
            if(!this.state.listDat) {
                console.log('wait');
            } else {

                let newC = data;
                let oldL = this.state.listDat

                for (var i = 0; i < oldL.length; i++) {

                    if(oldL[i].listId == newC.listId) {

                        oldL[i].cards.push(newC);
                        this.setState({
                            listDat : oldL
                        });           
                    }
                }
            }
            
        })

        this.state.socket.on('deleteList', data=> {

            let obj = data;
            let oldL = this.state.listDat

            for (var i = 0; i < oldL.length; i++) {

                if(oldL[i].listId == obj.listId) {
 
                    oldL.splice(i, 1);
                    this.setState({
                        listDat : oldL
                    });
                }
            }

        }) 
        
        this.state.socket.on('deleteCard', data=> {

            let obj = data;
            let oldL = this.state.listDat

            for (var i = 0; i < oldL.length; i++) {

                if(oldL[i].listId == this.state.cardx.listId) {
 
                    for (var j = 0; j < oldL[i].cards.length; j++) {
                    
                        if(oldL[i].cards[j].cardId == obj.cardId) {
                    
                            oldL[i].cards.splice(j, 1);
                            this.setState({
                                listDat : oldL
                            });

                        } 
                    }    
                }
            }

        })        

    }

    // fetch list and card
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
                
                // set state lists and members - state array
                this.setState({
                    listDat : dat.lists,
                    memDatB: dat.members
                });  
                
                if(res.data.lists.length == 0) {
                
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

    // create list - modal - title
    updateListTitle = (evt) => {
        this.setState({
            listTitle: evt.target.value
        });
    }

    getProfileImageURL() {
        const user = firebase.auth().currentUser
        if (user) {
            return user.photoURL;
        } else {
            // Not Signed-in
        } 
    }

    // Submit Btn - Create List Modal
    createListFn = () => {

        if(this.state.listDat.length == 0) {
            
            // Random No
            const min = 500;
            const max = 1000;
            const rand = min + Math.random() * (max - min);
            const roundR = Math.round(rand); 
        
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

    // Default
    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    // list modal - true
    clistBoolFn = () => {
        this.setState({
            listBool : true
        }); 
    } 

    // list modal - false
    clistCloseFn = () => {
        this.setState({
            listBool : false
        }); 
    }

    // click on plus - list
    cardBoolFn = (lobj) => {
        this.setState({
            cardBool : true,
            listId: lobj.listId,
            //cardDat: lobj.cards,
        }); 
    }   

    handleMemberInputChange = (e, index) => {

        const { name, value } = e.target;
        const list = this.state.finalMemB;
        list[index][name] = value;
        
        this.setState({
            finalMemB : list
        }); 
    }; 

    handleAddBtn = () => {
        
        const obj = { name: "", email: "", imgUrl: "" }
        
        this.setState({
            finalMemB : [...this.state.finalMemB, obj]
        });         
    }; 

    handleRemoveBtn = (index) => {

        const list = this.state.finalMemB;
        list.splice(index, 1);

        this.setState({
            finalMemB : list
        });     
    };
    
    // card close - false
    cardCloseFn = () => {
        this.setState({
            cardBool : false
        }); 
    }

    // card name - modal
    updateCardName = (evt) => {
        
        this.setState({
            cardName: evt.target.value
        });
    }

    // card name - modal
    updateCardDesc = (evt) => {

        this.setState({
            cardDesc: evt.target.value
        });
    }

    // card name - modal
    updateCardDue = (evt) => {

        this.setState({
            cardDue: evt.target.value
        });
    }

    // Submit Btn - Create Card Modal
    cardSubmitFn = () => {

        if(this.state.cardDat.length == 0) {
                        
            // Random No
            const min = 500;
            const max = 1000;
            const rand = min + Math.random() * (max - min);
            const roundR = Math.round(rand); 
            
            // Axios POST
            const tokeny = localStorage.getItem('token');
            const objy = JSON.parse(localStorage.getItem('boardobj'));
            let reqBody = ''

            const config = {
                headers: {
                    'Authorization': tokeny,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                }
            }
        
            if( objy.type == 'private') {
                
                reqBody = {
                    "cardName": this.state.cardName,
                    "cardDescription": this.state.cardDesc,
                    "dueDate": this.state.cardDue,
                    "pos": roundR,
                    "assigned": [],
                    "listId": this.state.listId
                }

            } else {

                reqBody = {
                    "cardName": this.state.cardName,
                    "cardDescription": this.state.cardDesc,
                    "dueDate": this.state.cardDue,
                    "pos": roundR,
                    "assigned": this.state.finalMemB,
                    "listId": this.state.listId
                }        
                        
            }
         
            let url = 'https://boardservice-zode.herokuapp.com/api/' + objy.boardId + '/card/new';

            axios.post(url, reqBody, config)
            .then((res) => {
        
                if(res.status === 201) {   

                    this.cardCloseFn();

                    toast.info('Card Created!', {
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
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    refreshToken();
                }
            });

        } else {

            // add 1045 to last obj pos
            const lastObj = this.state.cardDat[this.state.cardDat.length - 1];
            const lastPos = lastObj.pos; 
            const num = 1045;
            const newPos = lastPos + num;
            console.log(newPos);

            // Axios POST
            const tokeny = localStorage.getItem('token');
            const objy = JSON.parse(localStorage.getItem('boardobj'));
            let reqBody = ''
    
            const config = {
                headers: {
                    'Authorization': tokeny,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                }
            }
        
            if( objy.type == 'private') {
                
                reqBody = {
                    "cardName": this.state.cardName,
                    "cardDescription": this.state.cardDesc,
                    "dueDate": this.state.cardDue,
                    "pos": newPos,
                    "assigned": [],
                    "listId": this.state.listId
                }

            } else {

                reqBody = {
                    "cardName": this.state.cardName,
                    "cardDescription": this.state.cardDesc,
                    "dueDate": this.state.cardDue,
                    "pos": newPos,
                    "assigned": this.state.finalMemB,
                    "listId": this.state.listId
                }        
                        
            }
         
            let url = 'https://boardservice-zode.herokuapp.com/api/' + objy.boardId + '/card/new';

            axios.post(url, reqBody, config)
            .then((res) => {
        
                if(res.status === 201) {               
                    
                    this.cardCloseFn();

                    toast.info('Card Created!', {
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
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    refreshToken();
                }
            });       
            
        }  
    }  

    /* Drag and Drop
    handleStart = (e, item) => {

        console.log('Dragging started for item: ', item);
        
        this.dragItem.current = item;
        setTimeout(() => {
            this.setState({
                Dragging : true,
            }); 
        },0)

    }

    handleDrag = (e, titem) => {

        console.log(titem);
          if (this.dragItem.current == titem) {
            console.log('not same', titem)
        } else {
            //console.log('dragging over item: ', item);
        }
    }

    handleStop = () => {
        console.log('Dragging stopped!');
    }

    handleEvent = (e, data) => {
        console.log('Event Type', e.type);
        console.log(e, data);
    }*/
    
    // list delete fn
    listDeleteFn = (lobj) => {

        const token1 = localStorage.getItem('token');
        const bobj = JSON.parse(localStorage.getItem('boardobj'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://boardservice-zode.herokuapp.com/api/' + bobj.boardId + '/list/delete/' + lobj.listId;

        axios.delete(url, config)
        .then((res) => {
    
            if(res.status === 201) {
            
                toast.info('List Deleted!', {
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
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });     
        
    }

    // card click modal
    cardClickBool = (obj) => {
        this.setState({
            cardClickBool : true,
            cardx: obj,
            //cardDat: lobj.cards,
        }); 
    }
    
    onetwo = () => {
        console.log(this.state.cardx);
    }

    acmCloseFn = () => {
        this.setState({
            cardClickBool : false,
        });         
    }

    /* Delete card fn */
    acmDeleteFn = () => {
     
        const token1 = localStorage.getItem('token');
        const bobj = JSON.parse(localStorage.getItem('boardobj'));

        const config = {
            headers: {
                'Authorization': token1,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        let url = 'https://boardservice-zode.herokuapp.com/api/' + bobj.boardId + '/card/delete/' + this.state.cardx.cardId;

        axios.delete(url, config)
        .then((res) => {
    
            if(res.status === 201) {
            
                this.setState({
                    cardClickBool : false,
                }); 

                toast.info('Card Deleted!', {
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
        })
        .catch(function (error) {
            if(error.response.status === 401) {
                refreshToken();
            }
        });        
    }

    render() {
        
        return (
            <div className="Card">
                
                <div className="c-top-nav">

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

                <div className="c-body-wrapper">

                    <div className="c-left-nav">
                        
                        <div className="c-left-nav-grid">
                            
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
                                <div className="c-lng3" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="c-lng4" data-tip data-for="calTip"></div>
                            </Link>

                            <Link to="/meet/scheduleNew" style={{ textDecoration: 'none' }}>
                                <div className="public-cb-lng5" data-tip data-for="videoCallTip"></div>
                            </Link>
                            <div className="c-lng6" data-tip data-for="noneTip"></div>
                            <div className="c-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="videoCallTip" place="right" effect="float" type="dark">Meet/Video Call</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>   

                        </div>
                    </div>
                    
                    <div className="c-body">
                        
                        <div className="cb-wrapper">

                            <div className="cb-xWrapper">
                                <div className="cbx-1">
                                    <p>Board Name: { this.state.boardName }</p>
                                </div>
                                <div className="cbx-2">
                                    <input type="submit" value="New List" className="cb-new-list-btn" onClick = { this.clistBoolFn }></input>
                                </div>
                            </div>
                            <div className="cb-proLine"></div>

                            <div className="cb-list-wrapper">

                                { !this.state.listDat ? (
                                      
                                    this.state.isEmpty ? (
                            
                                        <div className="BM-loading">
                                            <p>No Projects Found!</p>
                                        </div>

                                    ) : (
                                        <div className="PD-loading">
                                            <CirclesLoader />
                                        </div>
                                    )                                      

                                ):( this.state.listDat.map((litem, i) => (
                                
                                    <div className="cb-list">

                                        <div className="cbl-h">
                                            <div className="cblh-wr">
                                                <div className="cblh-p"><p>{ JSON.parse(JSON.stringify( litem.title )) }</p></div>
                                                <div className="cblh-plus" onClick = { () => this.cardBoolFn(litem) }></div>
                                                <div className="cblh-delete" onClick = { () => this.listDeleteFn(litem) }></div>
                                            </div>
    
                                            <div className="cblh-line"></div>
                                        </div>

                                        { /*<div className="cbl-spec-card">
                                            <p>Empty!</p>
                                        </div> */ }

                                        { !litem.cards ? (
                                            <p></p>

                                        ) : ( litem.cards.map((iCard, j) => (
                                
                                            <div className = "cbl-card">
                                                <div className="cblc-taskname">
                                                    <p className="cblc-tname">{ JSON.parse(JSON.stringify( iCard.cardName )) }</p>
                                                    <div className="cblc-icon" onClick = { () => this.cardClickBool(iCard) }></div>
                                                </div>
                                                
                                                <div className="cblc-wr">
                                                    {/*<div className="cblc-profile"><p>JD</p></div>*/}
                                                    <img className="cblc-profile" src = { this.state.avatar }/>
                                                    <div><p className="cblc-date">{ JSON.parse(JSON.stringify( iCard.dueDate )) }</p></div>
                                                </div>
                                            </div>
                                                
                                        )))}

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

                { this.state.cardBool ? (
                    
                    <div className="cardModal-wrapper">
                        
                        <div>
                            <div className="cardM-close" onClick = { this.cardCloseFn }></div>
                            
                            <div className="cardM-hdn"><p>Create New Card</p></div>
                            <div className="cardM-proLine"></div>
                        </div>
                        
                        <div className="cardM-body-wrx">
                            
                            <div className="cardM-left">
                                
                                <p className="cardM-namep">Card Name</p>
                                <input type="text" className="cardM-nameinp" placeholder="Card Name" onChange={ this.updateCardName }></input>
                                
                                <p className="cardM-descp">Description</p>
                                <textarea className="cardM-descinp" onChange={ this.updateCardDesc }></textarea>
                                
                                <p className="cardM-duep">Due Date</p>
                                <input type="date" placeholder="Due Date" className="cardM-dueinp" onChange={ this.updateCardDue }></input>
                            </div>
                            
                            <div className="cardM-right">
                                
                                <p className="cardM-abm">Assign Board Members</p>

                                { this.state.finalMemB.map((x, i) => {
                        
                                    return (
                                        <div className="cardM-box">
                                            
                                            <div className="cardM-one-row-wrapper">

                                                <input list="email" placeholder="Email" className="cardM-email" name="email" onChange={e => this.handleMemberInputChange(e, i)}/>
                                                
                                                <datalist id="email">
                                                    
                                                    { !this.state.memDatB ? (
                                                        <option value = "Loading..." />

                                                    ):( this.state.memDatB.map((mdat, j) => (
                                                        <option value = { JSON.parse(JSON.stringify(mdat.email)) } />
                                                    )))}

                                                </datalist>

                                                <span className="cardM-btn-box">
                                                    { this.state.finalMemB.length !== 1 && <button onClick={() => this.handleRemoveBtn(i) } className="cardM-remove-btn">Remove</button>}
                                                    { this.state.finalMemB.length - 1 === i && <button onClick={ this.handleAddBtn } className="cardM-add-btn">New</button>}
                                                </span>
                                            </div>

                                        </div>
                                    );
                                })} 


                            </div>
                        </div>
                        
                        <input type="submit" className="cardM-submit" onClick = { this.cardSubmitFn }></input>
                    </div>                    
                ):(
                    <p></p>
                )}                           

                {/* About Card Modal - acm */}
                { this.state.cardClickBool ? (
                    
                    <div className="aboutCardModal">
                        
                        <div>
                            <div className="acm-close" onClick = { this.acmCloseFn }></div>
                            <p className="acm-hdn">Card Name: { JSON.parse(JSON.stringify( this.state.cardx.cardName )) }</p>
                            <div className="acm-proLine1"></div>                        
                        </div>
                        
                        <div>
                            <p className="acm-desc-etc">Description: { JSON.parse(JSON.stringify( this.state.cardx.cardDescription ))}</p>
                            <p className="acm-desc-etc">Created By: { JSON.parse(JSON.stringify( this.state.cardx.createdBy ))}</p>
                            <p className="acm-desc-etc">Due Date: { JSON.parse(JSON.stringify( this.state.cardx.dueDate ))}</p>
                            
                            <div className="acm-proLine2"></div>
                            
                            <p className="acm-delete-hdn">Delete Card</p>
                            <div><input type="submit" value="Delete" className="acm-delete-btn" onClick = { this.acmDeleteFn }></input></div>
                        
                        </div>    

                    </div>                    
                ):(
                    <p></p>
                )} 

            </div>
        );
    }
}
