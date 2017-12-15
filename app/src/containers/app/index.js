
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../home'

export default ({ store, history }) => (
	<MuiThemeProvider>
	    <Provider store={store}>
	        <ConnectedRouter history={history}>
	            <div>
	                <Route path="/" component={Home} />
	            </div>
	        </ConnectedRouter>
	    </Provider>
	</MuiThemeProvider>
)
