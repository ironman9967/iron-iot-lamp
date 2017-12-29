
import { handleError } from './util'

import { lamp } from '../device'

const { switchLampLight } = lamp

export const createRoutes = ({
	log,
	registry,
	region,
	project
}) => ([{
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
}])
