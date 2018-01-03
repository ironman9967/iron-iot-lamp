
export const createRoutes = () => ([{
	method: 'GET',
	path: '/_ah/health',
	handler: (req, h) => h.response('')
}])
