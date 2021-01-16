import './SignUp.css';
function SignUpPage() {
    return (
        <div className="SignUpPage">
            <span className="zod-title">zode</span>
            <p className="zod-tagline">Collaboration platform for software development teams</p>
                <div className="card zod-signupcard">
                    <div className="card-body">
                        <h5 className="card-title">Create new account</h5>
                        <div className="zod-signup-inputs">
                            <div className="input-group"> 
                                <input type="text" className="form-control input-sm zod-name-grp" placeholder="First Name" /> 
                                <span className="input-group-btn"></span> 
                                <input type="text" className="form-control input-sm zod-name-grp" placeholder="Last Name" /> 
                            </div> 
                            <input type="text" placeholder="Email" className="zod-signup-grp form-control"></input>
                            <input type="password" placeholder="Password" className="zod-signup-grp form-control"></input>
                            <input type="password" placeholder="Confirm Password" className="zod-signup-grp form-control"></input>
                            <input type="submit" value="Sign Up" className="zod-signup-btn zod-signup-grp"/>
                            <hr/>
                            <button type="submit" className="zod-google-btn-1"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></img>Sign up with Google</button>
                        </div>
                    </div>
                </div>
            <span className="zod-signuptxt">Already have an account? Login</span>
            <footer className="zod-footer">
                <ul>
                    <li>Privacy & Terms</li>
                    <li>Contact Us</li>
                </ul>
            </footer>
        </div>
    );
}

export default SignUpPage;