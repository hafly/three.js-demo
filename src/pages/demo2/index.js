import React from 'react';
import {Earth} from "./Earth";

// Glow Shader
export default class Demo2 extends React.Component {

    componentDidMount() {
        new Earth(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}