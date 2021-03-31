import './CreateProject.css';
import { Dropdown } from 'react-bootstrap';

function CreateProject() {
    return (
        <div className="createPro">   

            <div className="cp-top-nav">
                <div className="cp-left-wrapper-tn">
                    <p className="cp-title">zode</p>
                </div>

                <div className="cp-right-wrapper-tn">                    

                    <Dropdown>
                        <Dropdown.Toggle className="cp-profile-circle">
                            <p className="cp-profile-text">JD</p>
                        </Dropdown.Toggle>
        
                        <Dropdown.Menu>
                            <Dropdown.Item href="/login">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                  

                </div>

            </div>        

            <div>
                <h1>Create new project</h1>
            </div>
            
        </div>
    );
}

export default CreateProject;