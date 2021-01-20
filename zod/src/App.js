import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUp';
import Project from './components/Dashboard/Project/Project';
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
        <Route path = "/dashboard/project">
          <Project/>
        </Route>        
      </div>
    </Router>
  );
}

export default App;
