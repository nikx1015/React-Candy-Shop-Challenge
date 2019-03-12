import React, {Component} from 'react';
import Candy from './candy-icon.png'
import '../candy.css'
import { Link } from "react-router-dom";

class CandyList extends Component {
    render() {
        return (
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
        )
    }
}

export default CandyList;