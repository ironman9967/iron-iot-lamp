
import {
	LIGHT_TOGGLED,
	LIGHT_LED_ARRAY_SET
} from '../actions/lamp'

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
		case LIGHT_LED_ARRAY_SET:
			return {
				...state,
				meta: {
					...state.meta,
					updatedAt: action.device.meta.updatedAt
				},
				light: {
					...state.light,
					led: {
						...state.light.led,
						array: action.device.light.led.array
					}
				}
			}
		default:
			return state
	}
}
