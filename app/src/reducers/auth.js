
import clientId from '../google-oauth-clientId.iron-iot.json'

import { auth } from '../actions'
const { LOGGED_IN, LOGGED_OUT } = auth

export default (state = {
	isLoggedIn: false,
	clientId: clientId
}, {
	type,
	tokenObj
}) => type === LOGGED_IN ?
	{ ...state, tokenObj, isLoggedIn: true } :
		type === LOGGED_OUT ?
		{ ...state, isLoggedIn: false }
		: state
