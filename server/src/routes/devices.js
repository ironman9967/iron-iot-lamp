
import {
	getDeviceState,

	createLampDeviceApiDescription,
	switchLightOnOrOffPath,
	switchLampLight
} from '../device'

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: '/api/devices',
	handler: (req, h) => {
		const res = h.response(JSON.stringify([
			createLampDeviceApiDescription({
				id: 'esp32_0683C4',
				name: 'iron-iot-lamp'
			})
		]))
		res.headers = { 'content-type': 'application/json' }
		return res
	}
}])
