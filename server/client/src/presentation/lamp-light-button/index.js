
import React from 'react'

import IconButton from 'material-ui/IconButton'

import CircularProgress from 'material-ui/CircularProgress'
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline'

const styles = {
	spinner: {
		marginRight: '10px'
	}
}

const LampLightButton = ({
	id,
	updating,
	light,
	toggleLight
}) => !updating
	? (
		<IconButton
			onClick={() => toggleLight({ id })}
			tooltip={
				`turn lamp ${light.on ? 'off' : 'on '}`
			}
			tooltipPosition="bottom-left"
			iconStyle={
				light.on
					? { color: light.led.array[0] || 'orange' }
					: { color: 'black' }
			}
		>
			<LightBulbIcon />
		</IconButton>
	)
	: (
		<CircularProgress style={styles.spinner} />
	)

export default LampLightButton
