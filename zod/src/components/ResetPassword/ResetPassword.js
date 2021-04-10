import './ResetPassword.css';
import { useState } from 'react';
import axios from 'axios';


function ResetPassword() {
    const [email, setEmailValue] = useState('');
    const handleEmailChange = (e) => setEmailValue(e.target.value);
    return(
        <div className="resetPassword-page">
            <span className="rp-zod-title">zode</span>
            <div className="rp-container">
                <h2>Forgot password?</h2>
                <span>Enter your email & we'll send you a link to reset your password</span>
                <input type="email" value={email} onChange={handleEmailChange}></input>
                <input type="submit" value="Send reset link" onClick={ResetPasswordRequest.bind(this,email)}></input>
            </div>
        </div>
    );
}

function ResetPasswordRequest(email) {
    const reqBody = {
        "email": email, 
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    axios.post('https://userservice-zode.herokuapp.com/api/user/resetpassword', reqBody, config).then((response) => {
        if(response.status === 200) {
            alert("Password reset link sent! Please check your mail.");
            window.location.href = window.location.protocol + '//' + window.location.host + '/login';
        }
    });
}

export default ResetPassword;