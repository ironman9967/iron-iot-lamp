
import React from 'react'
import { render } from 'react-dom'
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers'

import App from './containers/app'

const history = createHistory()
const router = routerMiddleware(history)
const logger = createLogger()

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(
        thunk,
        router,
        logger
    )
)

render(
    <App store={store} history={history} />,
    document.getElementById('app')
)
registerServiceWorker();
