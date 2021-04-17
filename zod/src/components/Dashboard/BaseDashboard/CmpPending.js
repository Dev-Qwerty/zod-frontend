import './CmpPending.css';
import { Link } from "react-router-dom";

/* 
    ClassName Convention Used:-
        Eg: mp-top-nav -> MyProfile-top-nav ..
*/

function CmpPending() {
    return (
        <div className="cmpPI">

            <div className="cpi-wrapper">

                <div className="cpi-box">
            
                    <div className="cpi-box-item1">
                        <div className="cpi-box-item1-wrapper">
                            <p className="cpiY">Project Name: Project X</p>
                            <p className="cpiY qw">Invited By: John Doe</p>
                        </div>
                    </div>
                    <div className="cpi-box-item2">
                        <div><input value="Accept" type="submit" className="cpi-acceptBtn"></input></div>
                    </div>
                    <div className="cpi-box-item3">
                        <div><input value="Reject" type="submit" className="cpi-rejectBtn"></input></div>
                    </div>
                </div>

                <div className="cpi-box">
            
                    <div className="cpi-box-item1">
                        <div className="cpi-box-item1-wrapper">
                            <p className="cpiY">Project Name: Project X</p>
                            <p className="cpiY qw">Invited By: John Doe</p>
                        </div>
                    </div>
                    <div className="cpi-box-item2">
                        <div><input value="Accept" type="submit" className="cpi-acceptBtn"></input></div>
                    </div>
                    <div className="cpi-box-item3">
                        <div><input value="Reject" type="submit" className="cpi-rejectBtn"></input></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CmpPending;