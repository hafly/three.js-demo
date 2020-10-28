import React from 'react';

// Glow Shader
export default class Menu extends React.Component {
    render() {
        const style = {margin: '10px'}
        return (
            <>
                <div style={style}><a href="#demo1">Glow Shader</a></div>
                <div style={style}><a href="#demo2">Eath Shader And Atmoshphere Sahder</a></div>
                <div style={style}><a href="#demo3">FlowLight1</a></div>
                <div style={style}><a href="#demo4">Halo</a></div>
                <div style={style}><a href="#demo5">Gradient</a></div>
                <div style={style}><a href="#demo6">SweepingLight</a></div>
            </>
        )
    }
}