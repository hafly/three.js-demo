import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import Demo1 from './pages/demo1';

export default class IRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Route path="/demo1" component={Demo1}/>
                </App>
            </BrowserRouter>
        );
    }
}