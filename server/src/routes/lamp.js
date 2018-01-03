
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
		log,
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
			})
			.then(state => h.response(JSON.stringify(state)))
			.catch(err => handleError(err, h))
	}]
}
