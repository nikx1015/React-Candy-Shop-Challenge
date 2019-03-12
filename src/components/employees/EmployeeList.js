import React, {Component} from 'react';
import candy from './candy-icon.png'
import '../candy.css'
import { Link } from "react-router-dom";

class EmployeeList extends Component {
    render() {
        return (
            <section className="candy">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={candy} className="icon--candy" />
                                {employee.name}
                                <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
        );
    }
}

export default EmployeeList;