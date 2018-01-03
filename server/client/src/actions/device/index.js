
import { callApi } from '../call-api'

export const NAMED = 'DEVICE_NAMED'
export const STATE_LOADED = 'DEVICE_STATE_LOADED'
export const UPDATING = 'DEVICE_UPDATING'

export const updating = u => dispatch => dispatch({
	type: UPDATING,
	updating: u
})

export const nameDevice = ({
	id,
	name
}) => dispatch => dispatch(callApi({
	url: `/api/devices/${id}/name`,
	successAction: {
		type: NAMED,
		resultName: 'device'
	},
	fetchOpts: {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(name)
	}
}))

export const getDeviceState = id => dispatch => dispatch(callApi({
	url: `/api/devices/${id}/state`,
	successAction: {
		type: STATE_LOADED,
		resultName: 'device'
	}
}))
