import './Home.css'
import project from '../../assets/project.PNG';
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
            <div className="zod-homecard-1">
                <div className="zod-tagline-1">
                    <span>The best collaboration platform for your team</span>
                    <button className="zod-start-btn">Start for free</button>
                </div>
                <div className="green-dot-homebg"></div>
                <div className="homebg">
                    <img src={project} alt="project svg" className="project-svg"></img>
                </div>
                <div className="green-dot-homebg-down"></div>
            </div>
        </div>
    );
}

export default HomePage;