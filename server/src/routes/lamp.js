
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
	path: '/api/devices/{deviceId}/light/switch/{onOrOff}',
	config: { auth: 'default' },
	handler: ({ params: { deviceId, onOrOff } }, h) =>
		switchLampLight({
			log,
			registry,
			region,
			project,
			deviceId,
			onOrOff
		}).then(() => h.response()).catch(err => handleError(err, h))
}])
