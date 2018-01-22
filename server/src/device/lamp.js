
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
	setLedArray: ({
		log,
		project,
		registry,
		region,
		deviceId,
		array
	}) => publishDeviceConfig({
		log,
		project,
		registry,
		region,
		deviceId
	}, {
		light: {
			led: {
				array
			}
		}
	}, {
		filter: ({ light: { led: { array: currentArray } } }) =>{
			let match = true
			for (let i = 0; i < array.length && match; i++) {
				const { r: newR, g: newG, b: newB, w: newW } = array[i]
				const { r: curR, g: curG, b: curB, w: curW } = currentArray[i]
				match = newR === curR
					&& newG === curG
					&& newB === curB
					&& newW === curW
			}
			return match
		}
	})
})
