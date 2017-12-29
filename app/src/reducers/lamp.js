
import { LIGHT_TOGGLED } from '../actions/lamp'

export default (state = {
	light: {
		on: false
	}
}, {
	type,
	...action
}) => {
	switch (type) {
		case LIGHT_TOGGLED:
			return {
				...state,
				light: {
					...state.light,
					on: action.on
				}
			}
		default:
			return state
	}
}
