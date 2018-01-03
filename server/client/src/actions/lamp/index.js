
import { callApi } from '../call-api'

import { updating } from '../device'

export const LIGHT_TOGGLED = 'LAMP_LIGHT_TOGGLED'

export const toggleLight = ({
	id
}) => (dispatch, getState) => {
	const {
		light: {
			on
		}
	} = getState().devices.find(d => d.id === id)
	dispatch(updating(true))
	return dispatch(callApi({
			url: `/api/devices/${id}/light/${on ? 'off' : 'on'}`,
			successAction: {
				type: LIGHT_TOGGLED,
				resultName: 'device'
			}
		}))
		.then(() => dispatch(updating(false)))
}
