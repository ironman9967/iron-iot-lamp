
import clientId from '../google-oauth-clientId.iron-iot.json'

import { auth } from '../actions'
const { LOGGED_IN, LOGGED_OUT } = auth

export default (state = {
	isLoggedIn: false,
	clientId: clientId
}, {
	type,
	googleAuth,
	err
}) => {
	switch (type) {
		case LOGGED_IN:
			return { ...state, err, googleAuth, isLoggedIn: true }
		case LOGGED_OUT:
			return { ...state, err, googleAuth: void 0, isLoggedIn: false }
		default:
			return state
	}
}


/*
type === LOGGED_IN ?
	{ ...state, tokenObj, isLoggedIn: true } :
		type === LOGGED_OUT ?
		{ ...state, isLoggedIn: false }
		: state
*/
