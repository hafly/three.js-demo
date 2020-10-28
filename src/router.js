import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './App';
import Menu from './pages/menu';
import Demo1 from './pages/demo1';
import Demo2 from './pages/demo2';
import Demo3 from './pages/demo3';
import Demo4 from './pages/demo4';
import Demo5 from './pages/demo5';
import Demo6 from './pages/demo6';

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App history={createBrowserHistory()}>
                    <Route path="/" component={Menu} exact/>
                    <Route path="/demo1" component={Demo1} name="Glow Shader"/>
                    <Route path="/demo2" component={Demo2} name="Eath Shader And Atmoshphere Sahder"/>
                    <Route path="/demo3" component={Demo3} name="FlowLight1"/>
                    <Route path="/demo4" component={Demo4} name="Halo"/>
                    <Route path="/demo5" component={Demo5} name="Gradient"/>
                    <Route path="/demo6" component={Demo6} name="SweepingLight"/>
                </App>
            </HashRouter>
        );
    }
}