import './CmpPending.css';
import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

export default class CmpPending  extends React.Component {

    constructor() {
     
        super();
        this.state = {
            apiData: null
        }   

    }   
    
    componentDidMount(){
     
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            }
        }
    
        axios.get('https://projectservice-zode.herokuapp.com/api/projects/invites', config)
        .then((res) => {
    
            if(res.status === 200) {
                this.setState({ apiData: res.data });
            } else {

            }
        })
        .catch(function (error) {
            console.log(error);
        });         
    }
    
    render() {
        return (
            <div className="cmpPI">
    
                <div className="cpi-wrapper">

                    { !this.state.apiData ? (
                        <p>loading...</p>
                    ):( this.state.apiData.map(zdata => (

                        <div className="cpi-box">
                    
                            <div className="cpi-box-item1">
                                <div className="cpi-box-item1-wrapper">
                                    <p className="cpiY">Project Name: {JSON.parse(JSON.stringify(zdata.projectName))}</p>
                                    <p className="cpiY qw">Invited By: {JSON.parse(JSON.stringify(zdata.teamlead))}</p>
                                </div>
                            </div>
                            <div className="cpi-box-item2">
                                <div><input value="Accept" type="submit" className="cpi-acceptBtn"></input></div>
                            </div>
                            <div className="cpi-box-item3">
                                <div><input value="Reject" type="submit" className="cpi-rejectBtn"></input></div>
                            </div>
                        </div>
                    )))}             
    
                </div>
            </div>
        );
    }

}    