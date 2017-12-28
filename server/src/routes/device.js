
import { handleError } from './util'

import { nameDevice } from '../device'

export const createRoutes = ({
	log,
	registry,
	region,
	project
}) => ([{
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
}])
