
import device from './device'

import { STATE_LOADED } from '../actions/device'

export default (state = [], {
	type,
	devices,
	...action
}) => {
	if (state.length === 0 && type === STATE_LOADED) {
		return [ device(action.device, {}) ]
	}
	return (devices || state).map(d => device(d, { type, ...action }))
}
