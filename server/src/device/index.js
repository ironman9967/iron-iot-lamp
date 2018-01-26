
import { createConfig } from './config'
import { createLamp } from './lamp'

export const createDevice = ({
	log,
	gcpIotCore
}) => {
	const config = createConfig({
		log,
		gcpIotCore
	})
	const lamp = createLamp({
		config
	})

	return {
		config,
		lamp,
		nameDevice: ({
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
		}, {
			name
		}, {
			filter: ({ name }) => name
		})
	}
}
