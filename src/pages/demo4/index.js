import React from 'react';
import {Halo} from "./Halo";

// Halo
export default class Demo4 extends React.Component {

    componentDidMount() {
        document.title = 'Halo';
        new Halo(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}