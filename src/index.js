import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createHistory from 'history/createBrowserHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import reducers from './reducers'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger({
    collapsed: true
});

const history = createHistory()

let middleware = [ logger, thunk, routerMiddleware(history) ];

reducers.router = routerReducer;

let store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "Alexandria React"}),
  applyMiddleware(...middleware)
)

ReactDOM.render(
    	<App store={store} />,
	document.getElementById('root')
);

registerServiceWorker();
