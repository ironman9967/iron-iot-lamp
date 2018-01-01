
import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	log,
	gcpIotCoreQueue,
	registry,
	region,
	project
}) => {
	const {
		getDevices,
		getDeviceState
	} = createGcpIotCore({
		queue: gcpIotCoreQueue
	})
	return [{
		method: 'GET',
		path: '/api/devices',
		config: { auth: 'default' },
		handler: (req, h) => getDevices({
			registry,
			region,
			project
		}).then(deviceIds => Promise.all(deviceIds.map(deviceId => getDeviceState({
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
	}]
}
