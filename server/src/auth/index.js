
import jwt from 'jwt-simple'

export const createAuthStrategy = ({ log, oauthSecret }) => () => ({
	authenticate: async ({ state, headers: { authorization }}, h) => {
		const token = authorization.substring(7)
		let credentials = {}
		try {
			credentials = jwt.decode(token, oauthSecret, 'RS256')
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
			log(['auth','debug'], JSON.stringify({
				name: credentials.name,
				email: credentials.email
			}))
		}
		return h.authenticated({ credentials })
	}
})
