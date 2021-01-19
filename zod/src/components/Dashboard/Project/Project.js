import './Project.css';

function ProjectPg() {
    return (
        <div className="ProjectPg">
            <div className="top-nav">
                <div className="left-wrapper-tn">
                    <p className="title">zode</p>
                </div>

                <div className="right-wrapper-tn">
                    <div className="profile-circle">
                        <p className="profile-text">JD</p>
                    </div>
                </div>
            </div>

            <div className="search-etc-section">
                <div className="heading-wrapper">
                    <p className="heading">PROJECTS</p>
                </div>

                <div className="search-wrapper">
                    <input type="text" className="search"></input>
                </div>

                <div className="">
                    <input type="submit" value="New Project" className="new-project-btn"></input>
                </div>                                
            </div>

            <div className="status-etc-hdn">
                <p className="project-name">Project Name</p>
                <p className="status">Status</p>
                <p className="deadline">Deadline</p>
                <p className="team-lead">Team Lead</p>
            </div>
        </div>
    );
}

export default ProjectPg;