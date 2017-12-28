
import React from 'react'

import Toggle from 'material-ui/Toggle'

const Lamp = ({
	id,
	light: {
		on: isLightOn
	},
	switchLight
}) => (
	<Toggle
		toggled={isLightOn}
		onToggle={(event, isInputChecked) => switchLight(id, isInputChecked)}
	/>
)

export default Lamp
