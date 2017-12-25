
const LOGGED_IN = 'AUTH_LOGIN'
const LOGGED_OUT = 'AUTH_LOGOUT'

export default ({
	LOGGED_IN,
	loggedIn: res => {
		return {
			type: LOGGED_IN,
			googleAuth: res,
			err: void 0
		}
	},
	LOGGED_OUT,
	loggedOut: ({
		status,
		message
	}) => ({
		type: LOGGED_OUT,
		err: {
			status,
			message
		}
	})
})
