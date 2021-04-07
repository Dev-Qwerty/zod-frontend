import './ConfirmEmail.css';
import sendMsgSVG from '../../assets/send-message.svg';
import React from 'react';

function ConfirmEmail({email}) {
    const [seconds, setSeconds] = React.useState(10);
    var btn = document.getElementById('resend-btn');
    React.useEffect(() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(0);
        btn.removeAttribute("disabled");
      }
    });
    return(
        <div className="ConfirmEmailPage">
            <span className="zod-ctitle">zode</span>
            <div className="sendMsg-svg">
                <img src={sendMsgSVG} alt="send email svg" className="send-svg"></img>
            </div>
            <div className="zod-cheading">
                <h1>You're almost there!</h1>
                <p>We have sent a verificaton email to {email}.<br></br>Please click the link to verify your account.</p>
            </div>
            <div className="zod-mail-timer">
                <p>Didn't receive the mail? <button id="resend-btn" disabled>Resend</button> in {seconds} seconds.</p>
            </div>
        </div>
    )
}

export default ConfirmEmail;