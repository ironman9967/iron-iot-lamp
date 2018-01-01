
import { callApi } from '../call-api'

export const SET_DEVICE_LIST = 'DEVICES_SET_DEVICE_LIST'

export const loadDevices = () => dispatch => dispatch(callApi({
	url: '/api/devices',
	successAction: {
		type: SET_DEVICE_LIST,
		resultName: 'devices'
	}
}))
