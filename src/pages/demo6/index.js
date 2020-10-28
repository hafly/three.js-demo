import React from 'react';
import {SweepingLight} from "./SweepingLight";

// 扫光效果
export default class Demo5 extends React.Component {

    componentDidMount() {
        document.title = '发光墙';
        new SweepingLight(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}