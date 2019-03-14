import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import CandyList from './candy/CandyList'
import StoreList from './stores/StoreList'
import EmployeeList from './employees/EmployeeList'
import candyAPIManager from '../modules/CandyManager'
import employeeAPIManager from '../modules/EmployeeManager'
import locationAPIManager from '../modules/LocationManager'
import EmployeeDetail from './employees/EmployeeDetail'
import CandyDetail from './candy/CandyDetail'
import CandyForm from './candy/CandyForm'
import EmployeeForm from './employees/EmployeeForm'
import Login from './authentication/Login'



class ApplicationViews extends Component {

    state = {
        stores: [],
        employees: [],
        candy: [],
        // candyType: []
    }
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    deleteCandy = id => {
        return fetch(`http://localhost:5002/candy/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/candy`))
            .then(e => e.json())
            .then(candy => this.setState({
                candy: candy
            })
            )
    }
    addCandy = candy =>
        candyAPIManager.post(candy)
            .then(() => candyAPIManager.getAll())
            .then(candy =>
                this.setState({
                    candy: candy
                })
            );
    addEmployee = employeeObject =>
        employeeAPIManager.postEmployee(employeeObject)
            .then(() => employeeAPIManager.getAll()).then(employees =>
                this.setState({
                    employees: employees
                })
            );

    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employee => this.setState({
                employee: employee
            })
            )
    }
    componentDidMount() {
        const newState = {};
        return employeeAPIManager.getAll()
            .then(parsedEmployees => {
                newState.employees = parsedEmployees;
                return locationAPIManager.getAll()
            })
            .then(parsedStores => {
                newState.stores = parsedStores;
                return candyAPIManager.getAll();
            })
            .then(parsedCandy => {
                newState.candy = parsedCandy;
                this.setState(newState);
            })
    }


    render() {
        return (
            <div className="container-div">
                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    return <StoreList {...props} stores={this.state.stores} />
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        employees={this.state.employees} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />
                <Route exact path="/candy" render={(props) => {
                    return <CandyList {...props}
                        candy={this.state.candy} />
                }} />
                <Route path="/candy/:candyId(\d+)" render={(props) => {
                    return <CandyDetail {...props} deleteCandy={this.deleteCandy} candy={this.state.candy} />
                }} />
                <Route path="/candy/new" render={(props) => {
                    return <CandyForm {...props}
                        addCandy={this.addCandy}
                        candy={this.state.candy} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews