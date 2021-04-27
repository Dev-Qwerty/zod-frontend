import './ConfirmEmail.css';
import sendMsgSVG from '../../assets/send-message.svg';
import React from 'react';
import axios from 'axios';

function ConfirmEmail() {
    const [seconds, setSeconds] = React.useState(30);
    let [isDisabled, setDisabled] = React.useState(false);
    var btn = document.getElementById('resend-btn');
    React.useEffect(() => {
        if (seconds > 0) {
            setDisabled(true);
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setDisabled(false);  
            setSeconds(0);
        }

        const cleanup = () => {
            localStorage.removeItem("email");
        }
        
        window.addEventListener('beforeunload', cleanup);
        
    });

    async function handleBtnClicked() {
        const reqBody = {
            "email": localStorage.getItem("email"), 
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        axios.post('https://userservice-zode.herokuapp.com/api/user/resendverificationemail', reqBody, config).then((response) => {
            if(response.status === 200) {
                alert("Verification Email sent to your mail. Please check.");
            }
        })
        
        btn.setAttribute("disabled","");
        setSeconds(30);
        setTimeout(()=> {
            document.getElementById('resend-btn').removeAttribute('disabled');
        }, 30000);
    }
    return(
        <div className="ConfirmEmailPage">
            <span className="zod-ctitle">zode</span>
            <div className="sendMsg-svg">
                <img src={sendMsgSVG} alt="send email svg" className="send-svg"></img>
            </div>
            <div className="zod-cheading">
                <h1>You're almost there!</h1>
                <p>We have sent a verificaton email to {localStorage.getItem("email")}.<br></br>Please click the link to verify your account.</p>
            </div>
            <div className="zod-mail-timer">
                <p>Didn't receive the mail? <button id="resend-btn" disabled={isDisabled} onClick={handleBtnClicked.bind()}>Resend</button> in {seconds} seconds.</p>
            </div>
        </div>
    )
}

export default ConfirmEmail;