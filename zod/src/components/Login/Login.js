import './Login.css';
function LoginPage() {
    return (
        <div className="LoginPage">
            <div className="card zod-logincard">
                <div className="card-body">
                    <h5 className="card-title">Login to your account</h5>
                    <div className="zod-login-inputs">
                        <input type="text" placeholder="Enter email"></input>
                        <input type="password" placeholder="Enter password"></input>
                        <input type="submit" value="Login" className="zod-login-btn"/>
                        <hr/>
                        <button type="submit"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></img>Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;