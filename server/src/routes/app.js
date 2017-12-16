
export const createRoutes = () => ([{
	method: 'GET',
	path: '/{route*}',
	handler: {
		directory: {
			path: '.',
			redirectToSlash: true,
			index: true,
		}
	}
}])
