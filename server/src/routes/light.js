
export const createRoutes = ({
	log
}) => ([{
	method: 'POST',
	path: '/api/light/{route*}',
	handler: ({ params: { route } }, h) => {
		const res = h.response()
		res.statusCode = 200
		return res
	}
}])
