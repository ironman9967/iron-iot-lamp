
import { devices } from '../actions'
const { SET_DEVICE_LIST } = devices

export default (state = [], {
	type,
	devices
}) => type === SET_DEVICE_LIST
	? devices
	: state
