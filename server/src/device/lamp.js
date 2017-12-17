
import { publishDeviceConfig } from './config'

const lightPath = id => `/api/devices/${id}/light`
const switchLightPath = id => `${lightPath(id)}/switch`

export const switchLightOnOrOffPath = (id, onOrOff) => `${switchLightPath(id)}/${onOrOff}`

export const createLampDeviceApiDescription = ({ id, name }) => ({
	type: 'lamp',
	id,
	name,
	commands: {
		light: {
			on: switchLightOnOrOffPath(id, 'on'),
			off: switchLightOnOrOffPath(id, 'off')
		}
	}
})

export const switchLampLight = ({
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
