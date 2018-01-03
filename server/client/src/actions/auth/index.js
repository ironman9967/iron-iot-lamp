
export const LOGGED_IN = 'AUTH_LOGGED_IN'
export const LOGGED_OUT = 'AUTH_LOGGED_OUT'
export const ACCESS_TOKEN_LOADED = 'AUTH_ACCESS_TOKEN_LOADED'

const accessTokenId = 'access_token'

export const loggedIn = res => {
	localStorage.setItem(accessTokenId, res.tokenObj.id_token)
	return {
		type: LOGGED_IN,
		googleOAuth: res,
		access_token: res.tokenObj.id_token,
		ui: void 0
	}
}

export const loggedOut = ({
	status,
	message
}) => {
	localStorage.removeItem(accessTokenId)
	return {
		type: LOGGED_OUT,
		ui: {
			status,
			message
		}
	}
}

export const loadAccessToken = () => {
	let access_token = localStorage.getItem(accessTokenId)
	if (access_token === 'undefined') {
		access_token = null
		return {}
	}
	return {
		type: ACCESS_TOKEN_LOADED,
		access_token
	}
}
