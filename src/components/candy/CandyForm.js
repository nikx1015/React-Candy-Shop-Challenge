import React, { Component } from "react";
import "../candy.css";

export default class CandyForm extends Component {
    // Set initial state
    state = {
        candyName: "",
        status: "",
        candyId: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*
          Local method for validation, creating animal object, and
          invoking the function reference passed from parent component
       */
    constructNewCandy = evt => {
        evt.preventDefault();
        if (this.state.candy === "") {
            window.alert("Please select a candy type");
        } else {
            const candy = {
                name: this.state.candyName,
                status: this.state.status,
                // Make sure the employeeId is saved to the database as a number since it is a foreign key.
                candyId: parseInt(this.state.candyId)
            };

            // Create the animal and redirect user to animal list
            this.props
                .addCandy(candy)
                .then(() => this.props.history.push("/candy"));
        }
    };

    render() {
        return (
            <React.Fragment>
                <form className="candyForm">
                    <div className="form-group">
                        <label htmlFor="candyName">Candy name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="candyName"
                            placeholder="Candyname"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="status"
                            placeholder="status"
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="candy type">Assign Candy Type</label>
                        <select
                            defaultValue=""
                            name="candyType"
                            id="candyTypeId"
                            onChange={this.handleFieldChange}
                        >
                            <option value="">Select an candy type</option>
                            {this.props.candyTypes.map(ct => (
                                <option key={ct.id} id={ct.id} value={ct.id}>
                                    {ct.name}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <button
                        type="submit"
                        onClick={this.constructNewCandy}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}