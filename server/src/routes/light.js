
export const createRoutes = ({
	log
}) => ([{
	method: 'POST',
	path: '/api/light/on',
	handler: (req, h) => {
		const res = h.response()
		res.statusCode = 200
		return res
	}
}])
