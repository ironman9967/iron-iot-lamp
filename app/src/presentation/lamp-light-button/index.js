
import React from 'react'

import IconButton from 'material-ui/IconButton'

import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline'

const LampLightButton = ({
	style,
	id,
	light,
	toggleLight
}) => {
	return (
		<IconButton
			style={style}
			onClick={() => toggleLight({ id })}
			tooltip={
				`turn lamp ${light.on ? 'off' : 'on '}`
			}
			tooltipPosition="bottom-left"
			iconStyle={
				light.on
					? { color: 'orange' }
					: { color: 'black' }
			}
		>
			<LightBulbIcon />
		</IconButton>
	)
}

export default LampLightButton
