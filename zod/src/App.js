import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUp';
import Base from './components/BaseDashboard/Base';
import CreateProject from './components/BaseDashboard/CreateProject/CreateProject';
import MyProfileP from './components/BaseDashboard/Profile/Profile-MyProfile';
import MyProfilePI from './components/BaseDashboard/PendingInvites/PendingInvites-MyProfile';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ChatHome from './components/Chat/ChatHome';
import CreateChannel from './components/Chat/CreateChannel';
import firebase from 'firebase';
import ProjectD from './components/ProjectDashboard/ProjectD';
import Board from './components/Board/Board';
import CreatePersonalBoard from './components/Board/CreatePersonalBoard';
import CreatePublicBoard from './components/Board/CreatePublicBoard';
import BMain from './components/Board/BMain';
import Socket from './components/Board/Socket';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
require('dotenv').config()

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "zode-project.firebaseapp.com",
  projectId: "zode-project",
  storageBucket: "zode-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path = "/login">
          <LoginPage/>
        </Route>
        <Route path = "/signup">
          <SignUpPage/>
        </Route>
        <Route path = "/confirmEmail">
          <ConfirmEmail/>
        </Route>
        <Route path = "/resetPassword">
          <ResetPassword/>
        </Route>
        <Route path = "/basedashboard/home">
          <Base/>
        </Route>
        <Route path="/basedashboard/createproject">
          <CreateProject/>
        </Route>
        <Route path="/basedashboard/myprofile/profile">
          <MyProfileP/>
        </Route>   
        <Route path="/basedashboard/myprofile/pendinginvites">
          <MyProfilePI />  
        </Route>
        <Route path="/projectdashboard/home">
          <ProjectD />  
        </Route> 
        <Route path="/projectdashboard/board/bhome">
          <Board />  
        </Route>  
        <Route path="/projectdashboard/board/personal/create">
          <CreatePersonalBoard />  
        </Route>      
        <Route path="/projectdashboard/board/public/create">
          <CreatePublicBoard />  
        </Route>            
        <Route path="/projectdashboard/board/card">
          <BMain />  
        </Route>
        <Route path="/socket">
          <Socket />  
        </Route>        
        <Route path="/chat/home">
          <ChatHome />
        </Route>                  
        <Route path="/chat/createChannel">
          <CreateChannel />
        </Route>                                
      </div>
    </Router>
  );
}

export default App;
