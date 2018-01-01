
import { callApi } from '../call-api'

export const LIGHT_TOGGLED = 'LAMP_LIGHT_TOGGLED'

export const toggleLight = ({
	id
}) => (dispatch, getState) => {
	const {
		light: {
			on
		}
	} = getState().devices.find(d => d.id === id)
	return dispatch(callApi({
		url: `/api/devices/${id}/light/${on ? 'off' : 'on'}`,
		successAction: {
			type: LIGHT_TOGGLED,
			resultName: 'light'
		}
	}))
}
