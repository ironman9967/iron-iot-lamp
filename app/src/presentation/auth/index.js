
import React from 'react'
import { connect } from 'react-redux'

import GoogleLogin from 'react-google-login'

import AppBar from 'material-ui/AppBar'
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
	auth: {
		clientId,
		err
	},
	loggedIn,
	loggedOut
}) => (
	<div>
		<AppBar
			title="iron iot"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
		/>
		{
			err ? err.message : null
		}
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
	</div>
)

const mapState = ({
	auth
}) => ({
	auth
})

const mapDispatch = dispatch => ({
	loggedIn: response => dispatch(loggedIn(response)),
	loggedOut: err => dispatch(loggedOut(err))
})

export default connect(mapState, mapDispatch)(Auth)
