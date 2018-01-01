
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
}, {
	method: 'GET',
	path: '/app/{route*}',
	handler: (req, h) => h.redirect('/')
}])
