import React from 'react';
import {Gradient} from "./Gradient";

// 局部辉光测试
export default class Demo5 extends React.Component {

    componentDidMount() {
        document.title = '发光墙';
        new Gradient(this.ID);
    }

    render() {
        return (
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100vh'}}></div>
        )
    }
}