
import { publishDeviceConfig } from './config'

export const nameDevice = ({
	log,
	project,
	registry,
	region,
	deviceId,
	name
}) => publishDeviceConfig({
	log,
	project,
	registry,
	region,
	deviceId
}, { name }, {
	filter: ({ name }) => name
})
