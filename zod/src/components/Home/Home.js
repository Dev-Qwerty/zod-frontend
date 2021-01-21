import './Home.css'
import project from '../../assets/project.PNG';
import yellowv from '../../assets/yellow-vector.svg';
import roadmap from '../../assets/roadmap-advanced-1.png';
import yellowdot from '../../assets/yellow-dot-1.png';
import yellowline from '../../assets/yellow-line.svg';

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
            <div className="zod-homecard-2">
                <img src= {yellowv} alt="yellow svg" className="yellow-svg-1"></img>
                <div className="card zod-incard-2">
                    <img src= {roadmap} alt="roadmap img" className="roadmap-img"></img>
                    <img src= {yellowline} alt="yellow line" className="yellow-line"></img>
                    <span className="zod-tagline-2">Never miss your deadlines</span>
                    <span className="zod-tagline-3">Get notified about the deadlines <br></br>and manage your projects.</span>
                    <img src= {yellowdot} alt="yellow dots" className="yellow-dot"></img>
                </div>
            </div>
        </div>
    );
}

export default HomePage;