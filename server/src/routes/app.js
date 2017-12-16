
export const createRoutes = () => ([{
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '.',
			redirectToSlash: true,
			index: true,
		}
	}
}])
