
import device from './device'

import { STATE_LOADED } from '../actions/device'

const getDeviceDefaultState = d => device({
	...device({
		id: d.id,
		type: d.type
	}),
	...d
})

export default (state = [], action = {}) => {
	if (action.type === STATE_LOADED){
		if (state.length === 0) {
			action.devices = [ getDeviceDefaultState(action.device) ]
		}
		else {
			let d = state.find(d => d.id === action.device.id)
			d = getDeviceDefaultState(action.device)
		}
	}
	return (action.devices || state).map(d => {
		const {
			type,
			...props
		} = action
		return device(getDeviceDefaultState(d), { type, ...props })
	})
}
