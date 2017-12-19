
import React, { Component } from 'react'
import { connect } from 'react-redux'

import GoogleLogin from 'react-google-login'

import RaisedButton from 'material-ui/RaisedButton'

import { auth } from '../../actions'
const { loggedIn, loggedOut }  = auth

const styles = {
	googleLogin: {
		background: 'white'
	},
	loginButton: {
		marginTop: 16,
		marginLeft: 16,
		marginBottom: 16
	}
}

const Auth = ({
	clientId,
	loggedIn,
	loggedOut
}) => (
	<GoogleLogin
		tag="div"
		style={styles.googleLogin}
	    clientId={clientId}
	    buttonText="Login"
	    onSuccess={loggedIn}
	    onFailure={loggedOut}
	>
		<RaisedButton
			style={styles.loginButton}
			label="Login with Google"
			primary={true}
		/>
	</GoogleLogin>
)

const mapState = ({
	auth: {
		clientId
	}
}) => ({
	clientId
})

const mapDispatch = dispatch => ({
	loggedIn: response => dispatch(loggedIn(response)),
	loggedOut: response => dispatch(loggedOut(response))
})

export default connect(mapState, mapDispatch)(Auth)
