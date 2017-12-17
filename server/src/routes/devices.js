
import {
	config,
	lamp
} from '../device'

const { publishDeviceConfig, getDeviceState } = config
const { createLampDeviceApiDescription } = lamp

export const registerDevicePath = '/api/devices/register'

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: '/api/devices',
	handler: (req, h) => {
		const res = h.response(JSON.stringify({
			register: registerDevicePath,
			devices: [
				createLampDeviceApiDescription({
					id: 'esp32_0683C4',
					name: 'iron-iot-lamp'
				})
			]
		}))
		res.headers = { 'content-type': 'application/json' }
		return res
	}
}, {
	method: 'POST',
	path: registerDevicePath,
	config: { payload: { allow: 'application/json' }},
	handler: ({ payload }, h) => publishDeviceConfig({
		log,
		project: process.env.npm_package_config_gcpProject,
		registry: process.env.npm_package_config_gcpIotRegistry,
		region: process.env.npm_package_config_gcpIotRegion,
		deviceId: payload.deviceId
	}, {
		meta: payload
	}, {
		filter: ({ meta: { deviceId, name, type }}) => deviceId && name && type
	}).then(() => h.response()).catch(err => {
		const res = h.response()
		if (err.code) {
			if (err.error.indexOf('NOT_FOUND') >= 0) {
				res.statusCode = 404
			}
			else {
				throw err.error
			}
		}
		else {
			throw err
		}
		return res
	})
}])
