
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
	}),
	setLedColor: ({
		log,
		project,
		registry,
		region,
		deviceId,
		color
	}) => publishDeviceConfig({
		log,
		project,
		registry,
		region,
		deviceId
	}, {
		light: {
			led: {
				color
			}
		}
	}, {
		filter: ({ light: { led: { color: current } } }) => {
			console.log(color, current)
			return color.r === current.r
			&& color.g === current.g
			&& color.b === current.b
			//&& color.w === current.w
		}
	})
})
