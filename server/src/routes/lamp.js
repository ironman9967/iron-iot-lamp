
import {
	lamp
} from '../device'

const {
	switchLightOnOrOffPath,
	switchLampLight
} = lamp

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: switchLightOnOrOffPath('{deviceId}', '{onOrOff}'),
	handler: ({ params: { deviceId, onOrOff } }, h) =>
		switchLampLight({
			log,
			project: process.env.npm_package_config_gcpProject,
			registry: process.env.npm_package_config_gcpIotRegistry,
			region: process.env.npm_package_config_gcpIotRegion,
			deviceId,
			onOrOff
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
