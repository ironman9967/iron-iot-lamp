
const TURNED_ON = 'LIGHT_TURNED_ON'
const TURNED_OFF = 'LIGHT_TURNED_OFF'

export default ({
	TURNED_ON,
	turnOn: ({ id }) => fetch(`/api/devices/${id}/light/switch/on`)
		.then(() => ({
		    type: TURNED_ON
		})),
	TURNED_OFF,
	turnOff: ({ id }) => fetch(`/api/devices/${id}/light/switch/off`)
		.then(() => ({
		    type: TURNED_OFF
		}))
})
