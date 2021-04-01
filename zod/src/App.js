import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUp';
import Base from './components/Dashboard/BaseDashboard/Base';
import CreateProject from './components/Dashboard/BaseDashboard/CreateProject';
import MyProfile from './components/Dashboard/BaseDashboard/MyProfile';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

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
        <Route path = "/basedashboard/home">
          <Base/>
        </Route>
        <Route path="/basedashboard/createproject">
          <CreateProject/>
        </Route>
        <Route path="/basedashboard/myprofile">
          <MyProfile/>
        </Route>                                   
      </div>
    </Router>
  );
}

export default App;
