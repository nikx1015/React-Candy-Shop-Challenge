import { Route } from 'react-router-dom'
import React, { Component } from "react"
import CandyList from './candy/CandyList'
import StoreList from './stores/StoreList'
import EmployeeList from './employees/EmployeeList'
import candyAPIManager from '../modules/CandyManager'
import employeeAPIManager from '../modules/EmployeeManager'
import locationAPIManager from '../modules/LocationManager'
import EmployeeDetail from './employees/EmployeeDetail'
import CandyDetail from './candy/CandyDetail'


class ApplicationViews extends Component {

    state = {
        stores: [],
        employees: [],
        candy: []
        // candyType: this.candyTypeArray
    }

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
                <Route exact path="/" render={(props) => {
                    return <StoreList stores={this.state.stores} />
                }} />
                    <Route exact path="/employees" render={(props) => {
                    return <EmployeeList  employees={this.state.employees} />
                }} />
                      <Route path="/employees/:employeeId(\d+)" render={(props) => {
    return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
}} />
                <Route exact path="/candy" render={(props) => {
                    return <CandyList candy={this.state.candy} />
                }} />
                <Route path="/candy/:candyId(\d+)" render={(props) => {
    return <CandyDetail {...props} deleteCandy={this.deleteCandy} candy={this.state.candy} />
}} />
                </div>
        )
    }
}

export default ApplicationViews