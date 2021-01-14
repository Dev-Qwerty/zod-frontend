import './App.css';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
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
      </div>
    </Router>
  );
}

export default App;
