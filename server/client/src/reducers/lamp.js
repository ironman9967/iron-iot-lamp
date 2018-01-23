
import {
	LIGHT_TOGGLED,
	LIGHT_LED_COLOR_SET
} from '../actions/lamp'

export default (state = {
	light: {
		on: false,
		led: {
			model: 'neopixel strip',
			type: 'RGBW',
			count: 60,
			color: { r: 0, g: 0, b: 0, w: 0 }
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
		case LIGHT_LED_COLOR_SET:
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
						color: action.device.light.led.color
					}
				}
			}
		default:
			return state
	}
}
