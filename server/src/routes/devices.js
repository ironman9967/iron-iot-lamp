
export const createRoutes = ({
	log,
	gcpIotCore: {
		getDevices,
		getDeviceState
	},
	registry,
	region,
	project
}) => ([{
	method: 'GET',
	path: '/api/devices',
	config: { auth: 'default' },
	handler: (req, h) => getDevices({
		project,
		registry,
		region
	}).then(deviceIds => Promise.all(deviceIds.map(deviceId => getDeviceState({
		project,
		registry,
		region,
		deviceId
	})))).then(devices => {
		const res = h.response(JSON.stringify(devices))
		res.headers = { 'content-type': 'application/json' }
		return res
	}).catch(err => {
		if (err instanceof Error) {
			throw err
		}
		else {
			throw new Error(JSON.stringify(err))
		}
	})
}])
