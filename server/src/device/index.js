
import * as config from './config'
import * as lamp from './lamp'

const nameDevice = ({
	log,
	project,
	registry,
	region,
	deviceId,
	name
}) => config.publishDeviceConfig({
	log,
	project,
	registry,
	region,
	deviceId
}, { name }, {
	filter: ({ name }) => name
})

export {
	config,
	lamp,
	nameDevice
}
