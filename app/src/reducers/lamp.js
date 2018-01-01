
import { LIGHT_TOGGLED } from '../actions/lamp'

export default (state = {
	light: {
		on: false,
		led: {
			model: 'neopixel strip',
			type: 'RGBW',
			count: 60,
			array: []
		},
		animation: {
			current: null,
			available: []
		}
	}
}, action = {}) => {
	switch (action.type) {
		case LIGHT_TOGGLED:
			return {
				...state,
				meta: {
					...state.meta,
					updatedAt: action.device.meta.updatedAt
				},
				light: {
					...state.light,
					on: action.device.light.on
				}
			}
		default:
			return state
	}
}
