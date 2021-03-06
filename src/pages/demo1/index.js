import React from 'react';
import {Glow} from "./Glow";

// Glow Shader
export default class Demo1 extends React.Component {

    componentDidMount() {
        document.title = 'Glow Shader';
        new Glow(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}