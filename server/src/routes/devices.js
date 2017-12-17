
import {
	config,
	lamp
} from '../device'

const { publishDeviceConfig, getDeviceState } = config
const { createLampDeviceApiDescription } = lamp

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: '/api/devices',
	handler: (req, h) => {
		const res = h.response(JSON.stringify({
			devices: [
				createLampDeviceApiDescription({
					id: 'esp32_0683C4'
				})
			]
		}))
		res.headers = { 'content-type': 'application/json' }
		return res
	}
}])
