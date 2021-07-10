import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Exercise1 from './views/exercise1';
import Exercise2 from './views/exercise2';

import 'bootstrap/dist/css/bootstrap.css';

const Index = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/exercise1">
                <Exercise1 />
            </Route>
            <Route path="/exercise2">
                <Exercise2 />
            </Route>
            <Redirect from="*" to="/exercise1" />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<Index />, document.getElementById('root'));
