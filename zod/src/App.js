import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import ProjectPage from './components/Dashboard/Project/ProjectPage';
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
        <Route path = "/dashboard/projectpage">
          <ProjectPage/>
        </Route>        
      </div>
    </Router>
  );
}

export default App;
