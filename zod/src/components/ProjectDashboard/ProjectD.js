import './ProjectD.css';
import { Link, Route } from "react-router-dom";
import React from 'react';
import ReactTooltip from "react-tooltip";
import refreshToken from '../../functions/refreshToken';
 
/* 
    HOME

    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class ProjectD extends React.Component {

    constructor() {
     
        super();
        this.state = {
            data: '',
            tlead: '',
            dline: '',
            time: new Date(),
        }
    }

    componentDidMount(){

        setInterval(this.update, 1000)

        refreshToken();

        const obj = JSON.parse(localStorage.getItem('pdata'));

        this.setState({
            pname : obj.projectName,
            tlead: obj.teamlead,
            dline: obj.deadline
        });      
        
    }

	update = () => {
		
		this.setState({
			time: new Date()
		})
		
	};

    backToBaseFn = () => {
        //localStorage.setItem('pdata');
        window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';       
    }

    logout = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';   
    }

    render() {
    
		const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()
		const s = this.state.time.getSeconds()

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
                                    <div className="pd-lng1" data-tip data-for="homeTip"></div>
                                </div>
                            </Link> 

                            <Link to="/projectdashboard/board/bhome" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng2" data-tip data-for="boardTip">
                                </div>
                            </Link>

                            <Link to="/chat/home" style={{ textDecoration: 'none' }}>
                                <div className="pd-chat" data-tip data-for="chatTip">
                                </div>
                            </Link>               

                            <Link to="/projectdashboard/calender" style={{ textDecoration: 'none' }}>
                                <div className="pd-lng4" data-tip data-for="calTip">
                                </div>
                            </Link> 
                            <div className="pd-lng5" data-tip data-for="noneTip"></div>
                            <div className="pd-lng6" data-tip data-for="noneTip"></div>
                            <div className="pd-lng7" data-tip data-for="noneTip"></div>

                            <ReactTooltip id="homeTip" place="right" effect="float" type="dark">Home</ReactTooltip> 
                            <ReactTooltip id="boardTip" place="right" effect="float" type="dark">Board</ReactTooltip>
                            <ReactTooltip id="chatTip" place="right" effect="float" type="dark">Chat</ReactTooltip> 
                            <ReactTooltip id="calTip" place="right" effect="float" type="dark">Calender</ReactTooltip>
                            <ReactTooltip id="noneTip" place="right" effect="float" type="dark">None</ReactTooltip>
                                                         
                        </div>
                    </div>
                    
                    <div className="pd-body">
                        
                        <div className="pdb-hdn-wrapper">

                            <div className="pdb-hdn-left">
                                <div className="pdb-hl-1"><p>Project Name:&nbsp;&nbsp;{ this.state.pname }</p></div>
                                <div className="pdb-hl-2"><p>Team Lead:&nbsp;&nbsp;<span className="wrx">{ this.state.tlead }</span></p></div>
                            </div>

                            <div className="pdb-hdn-right">
                                <div className="pdb-hr-1"><p>Due By:&nbsp;&nbsp;{ this.state.dline }</p></div>
                            </div>
                        </div>

                        <div className="pdb-proLine"></div>

                        <div className="pdb-meetings">

                            <div className="pdb-m-left">
                                <div>
                                    <p>Scheduled Meetings</p>
                                </div>
                            </div>
                            
                            <div className="pdb-m-right">  
                                <h1 className="digital-time-h1">{h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}