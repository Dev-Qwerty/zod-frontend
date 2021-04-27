import React, { useEffect } from 'react';
import './SignUp.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap-button-loader';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure()

const { useState } = React;

function SignUpPage() {    
    const [fname, setfNameValue] = useState('');
    const [lname, setlNameValue] = useState('');
    const [email, setemailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    const [cpassword, setCPasswordValue] = useState('');
    const [cookies, setCookie] = useCookies(['token']);
    const [loading, setLoader] = useState(false);
    const [btnText, setBtnText] = useState('Sign Up');

    const handlefNameChange = (e) => setfNameValue(e.target.value);
    const handlelNameChange = (e) => setlNameValue(e.target.value);
    const handleEmailChange = (e) => setemailValue(e.target.value);
    const handlepasswordChange = (e) => setPasswordValue(e.target.value);
    const handleCPasswordChange = (e) => setCPasswordValue(e.target.value);
    return (
        <div className="SignUpPage">
            <span className="zod-title">zode</span>
            <p className="zod-tagline">Collaboration platform for software development teams</p>
                <div className="card zod-signupcard">
                    <div className="card-body">
                        <h5 className="card-title">Create a new account</h5>
                        <div className="zod-signup-inputs">
                            <div className="input-group"> 
                                <input type="text" className="form-control input-sm zod-name-grp" placeholder="First Name" value={fname} onChange={handlefNameChange}/> 
                                <span className="input-group-btn"></span> 
                                <input type="text" className="form-control input-sm zod-name-grp" placeholder="Last Name" value={lname} onChange={handlelNameChange}/> 
                            </div> 
                            <input type="text" placeholder="Email" className="zod-signup-grp form-control" value={email} onChange={handleEmailChange}></input>
                            <input type="password" placeholder="Password" className="zod-signup-grp form-control" value={password} onChange={handlepasswordChange}></input>
                            <input type="password" placeholder="Confirm Password" className="zod-signup-grp form-control" value={cpassword} onChange={handleCPasswordChange}></input>
                            <Button variant="success" loading={loading} className="zod-signup-btn zod-signup-grp" onClick={SignUpRequest.bind(this, fname, lname, email, password, cpassword, setCookie, setLoader, setBtnText)}>{btnText}</Button>
                            <hr/>
                            <button type="submit" className="zod-google-btn-1"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo"></img>Sign up with Google</button>
                        </div>
                    </div>
                </div>
            <span className="zod-signuptxt">Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Login</Link></span>
            <footer className="zod-footer">
                <ul>
                    <li>Privacy & Terms</li>
                    <li>Contact Us</li>
                </ul>
            </footer>
        </div>
        );
}

async function SignUpRequest(fname, lname, email, password, cpassword, setCookie, setLoader, setBtnText) {
    setBtnText('Signing Up...');
    setLoader(true);
    if(fname === '' || lname === '' || email === '' || password === '') {
        toast('Please enter all fields!');
        setBtnText('Sign Up');
        setLoader(false);
        return;
    }
    else if(password !== cpassword) {
        toast('Passwords not matching!');
        setBtnText('Sign Up');
        setLoader(false);
        return;
    }
    else {
    const reqBody = {
        "fname": fname,
        "lname": lname,
        "email": email, 
        "password": password
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }
    }
    axios.post('https://userservice-zode.herokuapp.com/api/user/signup', reqBody, config).then((response) => {
        if(response.status === 201) {
            setCookie('token', email);
            window.location.href = window.location.protocol + '//' + window.location.host + '/confirmEmail';
        }
    }).finally(()=> {
        setLoader(false);
        setBtnText('Sign Up');
    }).catch(error => {
        if(error.response.data.error === 'user with the provided email already exists') {
            toast("Account with the given email already exists!");
            window.location.href = window.location.protocol + '//' + window.location.host + '/login';
        }
        else {
            toast(error.response.data.error);
        }
    })
    }
}

export default SignUpPage;