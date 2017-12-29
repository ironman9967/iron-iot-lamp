
import { DEVICE_NAMED } from '../actions/device'

import lamp from './lamp'

export default (state = {
	type: null
}, {
	type,
	name,
	...device
}) => {
	switch (type) {
		case DEVICE_NAMED:
			state = {
				...state,
				name
			}
			break;
	}
	switch (state.type) {
		case 'lamp':
			return lamp(state, { type, name, ...device })
	}
}
