import './Login.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import Button from 'react-bootstrap-button-loader';
import {toast} from 'react-toastify'; 

toast.configure()

const { useState } = React;
function LoginPage() {
    const [email, setemailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Login');
    
    const handleEmailChange = (e) => setemailValue(e.target.value);
    const handlepasswordChange = (e) => setPasswordValue(e.target.value);
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
                            <Button variant="success" loading={loading} className="zod-login-btn zod-login-grp" onClick={LoginRequest.bind(this, email, password, setLoader, setBtnText)}>{btnText}</Button>
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

function LoginRequest(email, password, setLoader, setBtnText) {
    setLoader(true);
    setBtnText('Logging in...');
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if(user.emailVerified) {
            localStorage.setItem('token', user.za);
            window.location.href = window.location.protocol + '//' + window.location.host + '/basedashboard/home';
        }
        else {
            localStorage.setItem('email', email);
            window.location.href = window.location.protocol + '//' + window.location.host + '/confirmEmail';
        }
        
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setBtnText("Sign In");
        setLoader(false);
        if(errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
            toast.info("No account exists with given email. Please sign up!", {position: toast.POSITION.BOTTOM_LEFT});
            window.location.href = window.location.protocol + '//' + window.location.host + '/signup'; 
        }
        else if(errorMessage === "The password is invalid or the user does not have a password.") {
            toast.error("Invalid email or password! Please check.", {position: toast.POSITION.BOTTOM_LEFT});
        }
        else {
            toast.error(errorMessage, {position: toast.POSITION.BOTTOM_LEFT})
        }

    });
}

export default LoginPage;