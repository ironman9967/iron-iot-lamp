
const LOGGED_IN = 'AUTH_LOGIN'
const LOGGED_OUT = 'AUTH_LOGOUT'

export default ({
	LOGGED_IN,
	loggedIn: ({
		tokenObj
	}) => ({
		type: LOGGED_IN,
		tokenObj
	}),
	LOGGED_OUT,
	loggedOut: () => ({
		type: LOGGED_OUT
	})
})
