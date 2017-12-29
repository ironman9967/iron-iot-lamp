
import React from 'react'

import IconButton from 'material-ui/IconButton'

import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';

const LampLightButton = ({
	style,
	id,
	light,
	toggleLight
}) => (
	<IconButton
		style={style}
		iconStyle={
			light.on
				? { color: 'orange' }
				: { color: 'black' }
		}
		tooltip={
			`turn lamp ${light.on ? 'off' : 'on '}`
		}
		tooltipPosition="bottom-left"
		onClick={() => toggleLight({ id })}
	>
		<LightBulbIcon />
	</IconButton>
)

export default LampLightButton
