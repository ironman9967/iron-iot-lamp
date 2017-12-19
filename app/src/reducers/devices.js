
import lamp from './lamp'

import { devices } from '../actions'
const { SET_DEVICE_LIST } = devices

export default (state = [], {
	type,
	devices = []
}) => state.concat(devices).map(device => lamp(device, { type }))
