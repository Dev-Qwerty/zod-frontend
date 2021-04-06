import './CreateProject.css';
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function CreateProject() {

    const [email, setEmailValue] = useState('');
    const [deadline, setDeadlineValue] = useState('');
    const [memberList, setMemberList] = useState([{ email: "", role: "" }]);

    // handle input change - pname, deadline
    const handleEmailChange = (e) => setEmailValue(e.target.value);
    const handleDeadlineChange = (e) => setDeadlineValue(e.target.value);
   
    // handle input change - memberList
    const handleMemberInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...memberList];
        list[index][name] = value;
        setMemberList(list);
    };    

    // handle click event - Remove button
    const handleRemoveBtn = index => {
        const list = [...memberList];
        list.splice(index, 1);
        setMemberList(list);
    };
    
    // Handle click event - Add button
    const handleAddBtn = () => {
        setMemberList([...memberList, { email: "", role: "" }]);
      };   

    return (
        <div className="createPro">   

            <div className="cp-top-nav">
                <div className="cp-left-wrapper-tn">
                    <p className="cp-title">zode</p>
                </div>

                <div className="base-mid-wrapper">
                    <p>BASE&nbsp;&nbsp;DASHBOARD</p>
                </div>

                <div className="cp-right-wrapper-tn">  
                    <div className="cp-dropdown">
                        <button className="cp-dropbtn">
                            <p className="cp-profile-text">JD</p> 
                        </button>

                        <div className="cp-dropdown-content">
                            <Link to="/basedashboard/home"><p>Home</p></Link>
                            <Link to="/basedashboard/myprofile"><p>My Profile</p></Link>
                            <Link to="/login"><p>Logout</p></Link>
                        </div>
                    </div>
                </div>
            </div>        
            <h1>hello</h1>
            <div className="cp-outermostbox">
                <h1>heloooo</h1>
                <div className="cp-box-hdn">
                    <p>Create New Project</p>
                </div>
                <p>Hellooo</p>
                <div className="cp-box-contents">
                    <div className="cp-inp-wrapper">
                        <h1>Hello</h1>
                        <div><input type="text" placeholder="Project Name" className="cp-inp-pname" onChange={handleEmailChange}></input></div>
                        <div><input type="text" placeholder="Deadline" className="cp-inp-deadline" onChange={handleDeadlineChange}></input></div>
                        <div><p>Add Members:-</p></div>
                    
                        {memberList.map((x, i) => {
                            return (
                                <div className="cpm-box">
                                    <input type="text" placeholder="Email" classNAme="cpm-email" name="email" onChange={e => handleMemberInputChange(e, i)}/>
                                    <input type="text" placeholder="Role" className="cpm-role" name="role" onChange={e => handleMemberInputChange(e, i)}/>
                                    <span className="cpm-btn-box">
                                        {memberList.length !== 1 && <button onClick={() => handleRemoveBtn(i)} className="cpm-remove-btn">Remove</button>}
                                        {memberList.length - 1 === i && <button onClick={handleAddBtn} className="cpm-add-btn">Add</button>}
                                    </span>
                                </div>
                            );
                        })}   
                        <div>{JSON.stringify(memberList)}</div>                 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProject;