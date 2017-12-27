
import lamp from './lamp'

export default (state = [], {
	type,
	devices
}) => devices
	? devices.map(device => lamp(device, { type }))
	: state
