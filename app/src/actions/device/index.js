
import { callApi } from '../call-api'

export const DEVICE_NAMED = 'DEVICE_NAMED'

export const nameDevice = ({
	id,
	name
}) => dispatch => dispatch(callApi({
	url: `/api/devices/${id}/name`,
	successAction: {
		type: DEVICE_NAMED
	},
	fetchOpts: {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(name)
	}
}))
