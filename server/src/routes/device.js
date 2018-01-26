
import { handleError } from './util'

import { createDevice } from '../device'

export const createRoutes = ({
	log,
	gcpIotCore,
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
		log,
		gcpIotCore
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
			})
			.then(state => h.response(JSON.stringify(state)))
			.catch(err => handleError(err, h))
	}, {
		method: 'GET',
		path: '/api/devices/{deviceId}/state',
		config: { auth: 'default' },
		handler: ({ params: { deviceId } }, h) =>
			getDeviceState({
				project,
				registry,
				region,
				deviceId
			})
			.then(state => h.response(JSON.stringify(state)))
			.catch(err => handleError(err, h))
	}]
}
