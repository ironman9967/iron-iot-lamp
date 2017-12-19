
import { publishDeviceConfig } from './config'

const devicePath = id => `/api/devices/${id}`
export const nameDevicePath = id => `${devicePath(id)}/name`

const lightPath = id => `${devicePath(id)}/light`
const switchLightPath = id => `${lightPath(id)}/switch`
export const switchLightOnOrOffPath = (id, onOrOff) => `${switchLightPath(id)}/${onOrOff}`

export const createLampDeviceApiDescription = ({ id, name }) => ({
	type: 'lamp',
	id,
	commands: {
		name: nameDevicePath(id),
		light: {
			on: switchLightOnOrOffPath(id, 'on'),
			off: switchLightOnOrOffPath(id, 'off')
		}
	},
	light: {
		on: false
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
}, { meta: { name } }, {
	filter: ({ meta: { name }}) => name
})
