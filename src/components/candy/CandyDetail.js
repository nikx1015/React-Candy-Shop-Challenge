import React, { Component } from "react"
import "../candy.css"
import Candy from './candy-icon.png'


export default class CandyDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const candy = this.props.candy.find(a => a.id === parseInt(this.props.match.params.candyId)) || {}

        return (
            <section className="candy">
                <div key={candy.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={Candy} className="icon--candy" />
                            {candy.name}
                        </h4>
                        <h6 className="card-title">{candy.detail}</h6>
                        <a href="#"
                            onClick={() => this.props.deleteCandy(candy.id)
                                            .then(() => this.props.history.push("/candy"))}
                            className="card-link">Delete</a>
                    </div>
                </div>
            </section>
        )
    }
}