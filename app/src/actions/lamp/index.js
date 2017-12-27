
export const TURNED_ON = 'LIGHT_TURNED_ON'
export const TURNED_OFF = 'LIGHT_TURNED_OFF'

export const turnOn = ({ id }) => fetch(`/api/devices/${id}/light/switch/on`)
	.then(() => ({
		type: TURNED_ON
	}))

export const turnOff = ({ id }) => fetch(`/api/devices/${id}/light/switch/off`)
	.then(() => ({
		type: TURNED_OFF
	}))
