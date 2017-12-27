
import React from 'react'

import GoogleLogin from 'react-google-login'

import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
	googleLogin: {
		background: 'white'
	},
	loginButton: {
		marginTop: 16,
		marginLeft: 16,
		marginBottom: 16
	},
	chip: {
		margin: 12,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	}
}

const Login = ({
	clientId,
	ui,
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
			ui ?
				<div style={styles.wrapper}>
					<Chip style={styles.chip} >
						{ui.message}
			        </Chip>
				</div> : null
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

export default Login
