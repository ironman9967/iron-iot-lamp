
import { callApi } from '../call-api'

import { updating } from '../device'

export const LIGHT_TOGGLED = 'LAMP_LIGHT_TOGGLED'
export const LIGHT_LED_COLOR_SET = 'LAMP_LIGHT_LED_COLOR_SET'

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

export const setLedColor = ({
	id,
	color: { r, g, b, w }
}) => (dispatch, getState) => dispatch(callApi({
	url: `/api/devices/${id}/light/led/color`,
	successAction: {
		type: LIGHT_LED_COLOR_SET,
		resultName: 'device'
	},
	fetchOpts: {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ r, g, b, w })
	}
}))
