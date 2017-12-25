
import lamp from './lamp'

export default (state = [], {
	type,
	devices = []
}) => state.concat(devices).map(device => lamp(device, { type }))
