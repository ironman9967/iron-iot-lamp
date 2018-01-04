
import jwt from 'jwt-simple'
import secret from '../google-oauth-secret.iron-iot.json'

export const createAuthStrategy = ({ log }) => () => ({
	authenticate: async ({ state, headers: { authorization }}, h) => {
		const token = authorization.substring(7)
		let credentials = {}
		try {
			credentials = jwt.decode(token, secret, 'RS256')
		}
		catch (err) {
			h.unauthenticated(err.message, { credentials })
			const res = h.response(JSON.stringify({
				message: 'please contact system admin'
			}))
			res.takeover()
			if (err.message === 'Token expired') {
				res.statusCode = 400
			}
			else {
				res.statusCode = 401
			}
			return res
		}
		if (credentials.email) {
			log(['auth','debug'], JSON.stringify(credentials))
		}
		return h.authenticated({ credentials })
	}
})
