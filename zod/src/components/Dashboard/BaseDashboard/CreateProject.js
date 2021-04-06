import './CreateProject.css';
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CreateProject() {

    const [pname, setemailValue] = useState('');
    const [deadline, setdeadlineValue] = useState('');
    const [memberList, setMemberList] = useState([{ email: "", role: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { nme, val } = e.target;
        const list = [...memberList];
        list[index][nme] = val;
        setMemberList(list);
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

            <div className="cp-outermostbox">
                <div className="cp-box-hdn">
                    <p>Create New Project</p>
                </div>
                <div className="cp-box-contents">
                    <div className="cp-inp-wrapper">
                        <div><input type="text" placeholder="Project Name" className="cp-inp-pname"></input></div>
                        <div><input type="text" placeholder="Deadline" className="cp-inp-deadline"></input></div>
                        <div><input type="submit" value="Add Member" className="cp-inp-addmember"/></div>
                        <div><input type="submit" value="Submit" className=""/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*function Appz() {
    //eslint-disable-next-line
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

// handle input change
const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };    
   
    return (
      <div className="App">
        <h1>Hello</h1>
        {inputList.map((x, i) => {
          return (
            <div className="cpp-box">
                <input type="text" placeholder="First Name" classNAme="cpp-fname" name="firstName" onChange={e => handleInputChange(e, i)}/>
                <input type="text" placeholder="Last Name" className="cpp-lname" name="lastName" onChange={e => handleInputChange(e, i)}/>
                <div className="btn-box">
                    {inputList.length !== 1 && <button onClick={() => handleRemoveClick(i)} className="mr10">Remove</button>}
                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                </div>
            </div>
          );
        })}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </div>
    );

}*/
export default CreateProject;