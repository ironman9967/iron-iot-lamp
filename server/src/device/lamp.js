
export const createLamp = ({
	config: {
		publishDeviceConfig
	}
}) => ({
	switchLampLight: ({
		log,
		project,
		registry,
		region,
		deviceId,
		onOrOff
	}) => publishDeviceConfig({
		log,
		project,
		registry,
		region,
		deviceId
	}, {
		light: {
			on: onOrOff === 'on'
		}
	}, {
		filter: ({ light: { on } }) => onOrOff === 'on'
			? on
			: !on
	})

})
