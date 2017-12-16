
const TURN_ON = 'SWITCH_LIGHT_TURN_ON'
const TURN_OFF = 'SWITCH_LIGHT_TURN_OFF'

export default ({
	TURN_ON,
	turnOn: () => ({
	    type: TURN_ON
	}),
	TURN_OFF,
	turnOff: () => ({
	    type: TURN_OFF
	})
})
