
import { NAMED, UPDATING } from '../actions/device'

import lamp from './lamp'

export default (state = {
	type: null
}, action = {}) => {
	switch (action.type) {
		case NAMED:
			state = {
				...state,
				meta: {
					...state.meta,
					updatedAt: action.device.meta.updatedAt
				},
				name: action.device.name
			}
			break;
		case UPDATING:
			state = {
				...state,
				updating: action.updating
			}
	}
	switch (state.type) {
		case 'lamp':
			state = {
				...state,
				...lamp(),
				...lamp(state, action)
			}
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
