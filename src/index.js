import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';
import Users from './Users';
import { browserHistory, Route, Router, IndexRoute } from 'react-router'
import './index.css';
import { Provider } from 'react-redux';
import StoreInstance from './store';


ReactDOM.render(
    <Provider store={StoreInstance}>
        <Router history={browserHistory}>
            <Route path="/" component={Root}>
                <IndexRoute component={Users}/>
                <Route path="/test" component={App}/>
            </Route>
        </Router>
    </Provider> ,
    document.getElementById('root')
);
