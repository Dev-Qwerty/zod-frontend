import './Login.css';
import {Link} from 'react-router-dom';

function LoginPage() {
    return (
        <div className="LoginPage">
            <span className="zod-title">zode</span>
            <p className="zod-tagline">Collaboration platform for software development teams</p>
                <div className="card zod-logincard">
                    <div className="card-body">
                        <h5 className="card-title">Login to your account</h5>
                        <div className="zod-login-inputs">
                            <input type="text" placeholder="Enter email" className="zod-login-grp form-control"></input>
                            <input type="password" placeholder="Enter password" className="zod-login-grp form-control"></input>
                            <input type="submit" value="Login" className="zod-login-btn zod-login-grp"/>
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

export default LoginPage;