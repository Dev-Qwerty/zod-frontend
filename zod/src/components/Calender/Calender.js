import './Calender.css';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import firebase from 'firebase';
import refreshToken from '../../functions/refreshToken';
//import loader from '../Loader/Loader'

export default class Calender extends React.Component {

    constructor() {
     
        super();
        this.state = {

        }
    }   
    async componentDidMount() {
                
    }

    componentWillUnmount() {
       
    }

    render() {

        return (

            <div className="Calender">
                <p>Hello this is calender!</p>         
            </div>
        );        
    }
}