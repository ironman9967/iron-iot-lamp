
import { handleError } from './util'

import { createDevice } from '../device'

export const createRoutes = ({
	log,
	gcpIotCoreQueue,
	registry,
	region,
	project
}) => {
	const device = createDevice({
		gcpIotCoreQueue
	})
	const { switchLampLight } = device.lamp
	return [{
		method: 'GET',
		path: '/api/devices/{deviceId}/light/{onOrOff}',
		config: { auth: 'default' },
		handler: ({ params: { deviceId, onOrOff } }, h) =>
			switchLampLight({
				log,
				registry,
				region,
				project,
				deviceId,
				onOrOff
			}).then(({
				light: {
					on
				}
			}) => h.response(JSON.stringify({
				on
			}))).catch(err => handleError(err, h))
	}]
}
