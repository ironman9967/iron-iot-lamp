
import jwt from 'jwt-simple'
import secret from '../google-oauth-secret.iron-iot.json'

export const createAuthStrategy = () => () => ({
	authenticate: async ({ state, headers: { authorization }}, h) => {
		try {
			const token = authorization.substring(7)
			return h.authenticated({
				credentials: {
					...jwt.decode(token, secret, 'RS256')
				}
			})
		}
		catch (err) {
			h.unauthenticated(err.message, {
				credentials: {}
			})
			const res = h.response("\"\"")
			res.takeover()
			if (err.message === 'Token expired') {
				res.statusCode = 400
			}
			else {
				res.statusCode = 401
			}
			return res
		}
	}
})
