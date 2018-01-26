
import { handleError } from './util'

import { createDevice } from '../device'

export const createRoutes = ({
	log,
	gcpIotCore,
	registry,
	region,
	project
}) => {
	const device = createDevice({
		log,
		gcpIotCore
	})
	const {
		switchLampLight,
		setLedColor
	} = device.lamp
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
	}, {
		method: 'POST',
		path: '/api/devices/{deviceId}/light/led/color',
		config: {
			auth: 'default',
			payload: { allow: 'application/json' }
		},
		handler: ({ params: { deviceId }, payload: color }, h) =>
            setLedColor({
				log,
				project,
				registry,
				region,
				deviceId,
				color
			})
			.then(state => h.response(JSON.stringify(state)))
			.catch(err => handleError(err, h))
	}]
}
