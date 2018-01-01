
import { handleError } from './util'

import { createDevice } from '../device'

export const createRoutes = ({
	log,
	gcpIotCoreQueue,
	registry,
	region,
	project
}) => {
	const {
		config: {
			getDeviceState
		},
		nameDevice
	} = createDevice({
		gcpIotCoreQueue
	})
	return [{
		method: 'POST',
		path: '/api/devices/{deviceId}/name',
		config: {
			auth: 'default',
			payload: { allow: 'application/json' }
		},
		handler: ({ params: { deviceId }, payload: name }, h) =>
			nameDevice({
				log,
				registry,
				region,
				project,
				deviceId,
				name
			}).then(() => h.response(JSON.stringify({ id: deviceId, name })))
			.catch(err => handleError(err, h))
	}, {
		method: 'GET',
		path: '/api/devices/{deviceId}/state',
		config: { auth: 'default' },
		handler: ({ params: { deviceId } }, h) =>
			getDeviceState({
				registry,
				region,
				deviceId
			}).then(state => h.response(JSON.stringify(state)))
			.catch(err => handleError(err, h))
	}]
}
