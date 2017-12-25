
import jwt from 'jwt-simple'
import secret from '../google-oauth-secret.iron-iot.json'

export const createAuthStrategy = () => () => ({
	authenticate: async ({ headers: { authorization }}, h) => {
		try {
			return h.authenticated({
				credentials: jwt.decode(authorization.substring(7), secret, 'RS256')
			})
		}
		catch (err) {
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
