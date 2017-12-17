
import { publishDeviceConfig } from '../device'

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: '/api/devices',
	handler: (req, h) => h.response(JSON.stringify([
		{
			id: 'esp32_0683C4'
		}
	]))
}, {
	method: 'POST',
	path: '/api/devices/{deviceId}/light/{onOrOff}',
	handler: ({ params: { deviceId, onOrOff } }, h) =>
		publishDeviceConfig({
			log,
			project: process.env.npm_package_config_gcpProject,
			registry: process.env.npm_package_config_gcpIotRegistry,
			region: process.env.npm_package_config_gcpIotRegion,
			deviceId
		}, {
			light: {
				on: onOrOff === 'on'
			}
		}, {
			filter: ({ light: { on } }) => onOrOff === 'on'
				? on
				: !on
		}).then(() => h.response()).catch(({ error }) => {
			const res = h.response()
			if (error.indexOf('NOT_FOUND') >= 0) {
				res.statusCode = 400
			}
			else {
				throw error
			}
			return res
		})
}])
