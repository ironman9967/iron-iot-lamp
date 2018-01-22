
import { callApi } from '../call-api'

import { updating } from '../device'

// import { rgb2rgbw } from '../../util/rgb2rgbw'

export const LIGHT_TOGGLED = 'LAMP_LIGHT_TOGGLED'
export const LIGHT_LED_ARRAY_SET = 'LAMP_LIGHT_LED_ARRAY_SET'

const getDevice = (id, getState) => getState().devices.find(d => d.id === id)

export const toggleLight = ({
	id
}) => (dispatch, getState) => {
	dispatch(updating(true))
	const {
		light: {
			on
		}
	} = getDevice(id, getState)
	return dispatch(callApi({
			url: `/api/devices/${id}/light/${on ? 'off' : 'on'}`,
			successAction: {
				type: LIGHT_TOGGLED,
				resultName: 'device'
			}
		}))
		.then(() => dispatch(updating(false)))
}

export const setLedArray = ({
	id,
	array
}) => (dispatch, getState) => {
	dispatch(updating(true))
	return dispatch(callApi({
			url: `/api/devices/${id}/light/led/array`,
			successAction: {
				type: LIGHT_LED_ARRAY_SET,
				resultName: 'device'
			},
			fetchOpts: {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(array.map(({ r, g, b }) => ({ r, g, b, w: 0 })))
				// body: JSON.stringify(array.map(rgb2rgbw))
			}
		}))
		.then(() => dispatch(updating(false)))
}
