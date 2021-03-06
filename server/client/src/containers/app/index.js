
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Home from '../home'
import Auth from '../auth'
import Devices from '../devices'
import Device from '../device'

export default ({ store, history }) => (
	<MuiThemeProvider>
	    <Provider store={store}>
	        <ConnectedRouter history={history}>
				<div>
					<Route path="/" component={Home} />
					<Route path="/app" component={Home} />
					<Route path="/app/auth" component={Auth} />
					<Route path="/app/devices" component={Devices} />
					<Route path="/app/device/:id" component={Device} />
				</div>
	        </ConnectedRouter>
	    </Provider>
	</MuiThemeProvider>
)
