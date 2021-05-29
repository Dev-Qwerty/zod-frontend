// URL:  http://localhost:3000/socket

import { useState, useEffect } from 'react';
import axios from 'axios';
import refreshToken from '../../functions/refreshToken';
import socketIOClient from 'socket.io-client';
let projectDetails = JSON.parse(localStorage.getItem('pdata'));
const ENDPOINT = 'https://boardservice-zode.herokuapp.com/'+ projectDetails.projectID  + "/boards"; // Board endpoint
//const ENDPOINT = 'https://chatservice-zode.herokuapp.com/'+ projectDetails.projectID + "/chat"; // Chat endpoint


function Socket() {
    const [response, setResponse] = useState('');
    
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {auth: {Authorization: localStorage.getItem('token')}});
        
        socket.on("connect", data => {
          setResponse(data);
          console.log(response);
        });
        return () => socket.disconnect();
      }, []);

      return(
          <div>
              <p>Welcome to socket home!</p>
          </div>
      )
}      

export default Socket;