import React, { Component } from 'react';
import Candy from './candy-icon.png'
import '../candy.css'
import { Link } from "react-router-dom";

class CandyList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="candyButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/candy/new")
                        }
                        }>
                        Add Candy
                </button>
                </div>

                <section className="candy">
                    {
                        this.props.candy.map(candy =>
                            <div key={candy.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <img src={Candy} className="icon--candy" />
                                        {candy.name}
                                        <Link className="nav-link" to={`/candy/${candy.id}`}>Details</Link>
                                    </h5>
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default CandyList;