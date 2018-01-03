
import React from 'react'
import { connect } from 'react-redux'

import Login from '../../presentation/login'

import { loggedIn, loggedOut } from '../../actions/auth'

const Auth = ({
	clientId,
	ui,
	loggedIn,
	loggedOut
}) => (
	<Login {
		...{
			clientId,
			ui,
			loggedIn,
			loggedOut
		}
	} />
)

const mapState = ({
	auth: {
		clientId,
		ui
	}
}) => ({
	clientId,
	ui
})

const mapDispatch = dispatch => ({
	loggedIn: response => dispatch(loggedIn(response)),
	loggedOut: ui => dispatch(loggedOut(ui))
})

export default connect(mapState, mapDispatch)(Auth)
