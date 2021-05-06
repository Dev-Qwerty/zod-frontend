import './Home.css'
import project from '../../assets/project.PNG';
import yellowv from '../../assets/yellow-vector.svg';
import roadmap from '../../assets/roadmap-advanced-1.png';
import yellowdot from '../../assets/yellow-dot-1.png';
import yellowline from '../../assets/yellow-line.svg';
import greyv from '../../assets/grey-vector.svg';
import greydot from '../../assets/grey-dot-1.svg';
import greyline from '../../assets/grey-line.svg';
import bluev from '../../assets/blue-vector.svg';
import chatimg from '../../assets/chat-img.png';
import plantrack from '../../assets/plan-track-1.png';
import bluedot from '../../assets/blue-dot-1.svg';
import blueline from '../../assets/blue-line.svg';
import tw from '../../assets/twitter-1.png';
import fb from '../../assets/facebook-1.png';
import lin from '../../assets/linkedin-1.png';
import inst from '../../assets/instagram-1.png';
import { Link } from "react-router-dom";

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
                        <Link to="/login"><li>Login</li></Link>
                        <Link to="/signup"><li><button className="zod-signup-navbtn">Sign Up</button></li></Link>
                    </ul>
            </div>
            <div className="zod-homecard-1">
                <div className="zod-tagline-1">
                    <span>The best collaboration platform for your team</span>
                    <Link to="/signup"><button className="zod-start-btn">Start for free</button></Link>
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
            <div className="zod-homecard-3">
                <img src= {greyv} alt="grey svg" className="grey-svg-1"></img>
                <div className="card zod-incard-3">
                    <img src= {chatimg} alt="chat img" className="chat-img"></img>
                    <img src= {greyline} alt="grey line" className="grey-line"></img> 
                    <span className="zod-tagline-4">Communication made easier</span>
                    <span className="zod-tagline-5">Chat with other teammate using<br></br>1-to-1 chat. Group them into<br></br>teams for better communication </span>
                    <img src= {greydot} alt="grey dots" className="grey-dot"></img>
                </div>
            </div>
            <div className="zod-homecard-4">
                <img src= {bluev} alt="blue svg" className="blue-svg-1"></img>
                <div className="card zod-incard-4">
                    <img src= {plantrack} alt="plantrack img" className="roadmap-img"></img>
                    <img src= {blueline} alt="blue line" className="yellow-line"></img> 
                    <span className="zod-tagline-2">Discuss features and Issues</span>
                    <span className="zod-tagline-3">Manage your project issues and<br></br>discuss new project features</span>
                    <img src= {bluedot} alt="blue dots" className="yellow-dot"></img>
                    <span className="zod-tagline-6">Experience the new way of teaming</span>
                    <Link to="/signup"><button className="zod-start-btn-2">Get started for free</button></Link>
                </div>
            </div>
            <div className="footer zod-footer-1">
                <span className="title">zode</span>
                <ul className="zod-footer-list1">
                    <li>About us</li>
                    <li>Contact</li>
                    <li>Careers</li>
                    <li>Terms</li>
                    <li>Privacy</li>
                </ul>
                <ul className="zod-footer-list2">
                    <li>Features</li>
                    <li>Downloads</li>
                    <li>Pricing</li>
                </ul>
                <ul className="zod-footer-list3">
                    <li>Join us on<br></br></li>
                    <li><img src={tw} alt="twitter logo"></img></li>
                    <li><img src={fb} alt="facebook logo"></img></li>
                    <li><img src={lin} alt="linkedin logo"></img></li>
                    <li><img src={inst} alt="instagram logo"></img></li>
                </ul>
                <span className="zod-copyright-txt">Copyright 2020 @Zod Inc.</span>
            </div>
        </div>
    );
}

export default HomePage;