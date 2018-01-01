
import { NAMED } from '../actions/device'

import lamp from './lamp'

export default (state = {
	type: null,
	display: 'Pending Device'
}, action) => {
	switch (action.type) {
		case NAMED:
			state = {
				...state,
				name: action.device.name
			}
			break;
	}
	switch (state.type) {
		case 'lamp':
			state = lamp(state, action)
	}
	if (state.id) {
		state.display = state.name
			? state.name
			: state.type
				? `New Device - ${state.id}`
				: `Pending Device - ${state.id}`
	}
	return state
}
