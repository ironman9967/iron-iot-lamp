
const SET_DEVICE_LIST = 'DEVICES_SET_LIST'

export default ({
	SET_DEVICE_LIST,
	setDeviceList: ({
		devices
	}) => ({
		type: SET_DEVICE_LIST,
		devices
	})
})
