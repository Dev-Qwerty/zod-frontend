import './Login.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import { useCookies } from 'react-cookie';


const { useState } = React;
function LoginPage() {
    const [email, setemailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    
    const handleEmailChange = (e) => setemailValue(e.target.value);
    const handlepasswordChange = (e) => setPasswordValue(e.target.value);
    const [cookies, setCookie] = useCookies(['token']);
    return (
        <div className="LoginPage">
            <span className="zod-title">zode</span>
            <p className="zod-tagline">Collaboration platform for software development teams</p>
                <div className="card zod-logincard">
                    <div className="card-body">
                        <h5 className="card-title">Login to your account</h5>
                        <div className="zod-login-inputs">
                            <input type="text" placeholder="Enter email" className="zod-login-grp form-control" value={email} onChange={handleEmailChange}></input>
                            <input type="password" placeholder="Enter password" className="zod-login-grp form-control" value={password} onChange={handlepasswordChange}></input>
                            <input type="submit" value="Login" className="zod-login-btn zod-login-grp" onClick={LoginRequest.bind(this, email, password, setCookie)}/>
                            <hr/>
                            <button type="submit" className="zod-google-btn"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo"></img>Login with Google</button>
                        </div>
                    </div>
                </div>
            <span className="zod-logintxt">Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Sign Up</Link></span>
            <footer>
                <ul>
                    <li>Privacy & Terms</li>
                    <li>Contact Us</li>
                </ul>
            </footer>
        </div>
    );
}

function LoginRequest(email, password, setCookie) {
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.za);
        if(user.emailVerified) {
            setCookie('token', user.za, {maxAge: 1200});
            window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';
        }
        else {
            setCookie('token', email);
            window.location.href = window.location.protocol + '//' + window.location.host + '/confirmEmail';
        }
        
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage);
    });
}

export default LoginPage;