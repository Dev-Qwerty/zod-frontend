import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUp';
import Base from './components/Dashboard/BaseDashboard/Base';
import CreateProject from './components/Dashboard/BaseDashboard/CreateProject';
import MyProfileP from './components/Dashboard/BaseDashboard/MyProfile-Profile';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import firebase from 'firebase';
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
      </div>
    </Router>
  );
}

export default App;
