
export const createRoutes = ({
	log
}) => ([{
	method: 'POST',
	path: '/api/light/{route*}',
	config: { payload: { allow: 'application/json' } },
	handler: ({ path: url, method, params: { route } }, h) => {
		log(['debug'], `${method.toUpperCase()} -> ${url}`)
		const res = h.response()
		res.statusCode = 200
		return res
	}
}])
