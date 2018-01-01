
import clientId from '../google-oauth-clientId.iron-iot.json'

import {
	LOGGED_IN,
	LOGGED_OUT,
	ACCESS_TOKEN_LOADED
} from '../actions/auth'

export default (state = {
	ui: null,
	googleOAuth: null,
	access_token: void 0,
	clientId: clientId
}, {
	type,
	ui,
	...action
}) => {
	switch (type) {
		case LOGGED_IN:
			return {
				...state,
				ui,
				googleOAuth: action.googleOAuth || state.googleOAuth,
				access_token: action.access_token || state.access_token
			}
		case LOGGED_OUT:
			return {
				...state,
				ui,
				googleOAuth: null,
				access_token: null
			}
		case ACCESS_TOKEN_LOADED:
			return {
				...state,
				access_token: action.access_token
			}
		default:
			return state
	}
}
