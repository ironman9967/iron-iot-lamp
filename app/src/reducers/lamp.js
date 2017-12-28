
import { TURNED_ON, TURNED_OFF } from '../actions/lamp'

export default (state = {
	light: {
		on: false
	}
}, {
	type
}) => {
	switch (type) {
		case TURNED_ON:
			return {
				...state,
				light: {
					...state.light,
					on: true
				}
			}
		case TURNED_OFF:
			return {
				...state,
				light: {
					...state.light,
					on: false
				}
			}
		default:
			return state
	}
}
