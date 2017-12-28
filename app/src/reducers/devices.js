
import device from './device'

export default (state = [], {
	type,
	devices,
	...action
}) => (devices || state).map(d => device(d, { type, ...action }))
