
import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'

import {
	turnOn,
	turnOff
} from '../../actions/lamp'

const Lamp = ({
	switchLight,
	device: {
		id,
		light: {
			on: isLightOn
		}
	}
}) => (
	<Toggle
		toggled={isLightOn}
		onToggle={(event, isInputChecked) => switchLight(id, isInputChecked)}
	/>
)

const mapState = ({
	devices
}) => ({
	device: devices[0]
})

const mapDispatch = dispatch => ({
	switchLight: (id, on) => on
		? turnOn({ id }).then(dispatch)
		: turnOff({ id }).then(dispatch)
})

export default connect(mapState, mapDispatch)(Lamp)
