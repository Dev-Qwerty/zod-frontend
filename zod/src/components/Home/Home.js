import './Home.css'
function HomePage() {
    return (
        <div className="HomePage">
            <div className="zod-top-nav">
                    <div className="left-wrapper-tn">
                        <p className="title">zode</p>
                    </div>

                    <ul className = "zod-nav-items">
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Login</li>
                        <li><button className="zod-signup-navbtn">Sign Up</button></li>
                    </ul>
            </div>
        </div>
    );
}

export default HomePage;