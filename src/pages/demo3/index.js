import React from 'react';
import {FlowLight} from "./FlowLight";

// Glow Shader
export default class Demo3 extends React.Component {

    componentDidMount() {
        document.title = 'Flow Light';
        new FlowLight(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}