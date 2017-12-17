
import {
	lamp
} from '../device'

const {
	switchLightOnOrOffPath,
	switchLampLight,
	nameDevicePath,
	nameDevice
} = lamp

const gcpInfo = {
	project: process.env.npm_package_config_gcpProject,
	registry: process.env.npm_package_config_gcpIotRegistry,
	region: process.env.npm_package_config_gcpIotRegion
}

export const createRoutes = ({
	log
}) => ([{
	method: 'GET',
	path: switchLightOnOrOffPath('{deviceId}', '{onOrOff}'),
	handler: ({ params: { deviceId, onOrOff } }, h) =>
		switchLampLight({
			log,
			...gcpInfo,
			deviceId,
			onOrOff
		}).then(() => h.response()).catch(err => handleError(err, h))
}, {
	method: 'POST',
	path: nameDevicePath('{deviceId}'),
	config: { payload: { allow: 'application/json' } },
	handler: ({ params: { deviceId }, payload: name }, h) =>
		nameDevice({
			log,
			...gcpInfo,
			deviceId,
			name
		}).then(() => h.response()).catch(err => handleError(err, h))
}, ])

const handleError = (err, h) => {
	const res = h.response()
	if (err.code) {
		if (err.error.indexOf('NOT_FOUND') >= 0) {
			res.statusCode = 404
		}
		else {
			throw new Error(err.error)
		}
	}
	else if (err.error) {
		throw new Error(err.error)
	}
	else {
		throw err
	}
	return res
}
