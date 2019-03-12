import React, {Component} from 'react';

class StoreList extends Component {
    render() {
        return (
            <article>
                <h1>Store Location List</h1>
                {this.props.stores.map((singleStore)=> {
                    return <p key={singleStore.id}>{singleStore.name}</p>
                })}
            </article>
        );
    }
}

export default StoreList;