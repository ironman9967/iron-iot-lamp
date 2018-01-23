
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
	light: {
		on,
		led: {
			color: { r, g, b }
		}
	},
	toggleLight
}) => !updating
	? (
		<IconButton
			onClick={() => toggleLight({ id })}
			tooltip={
				`turn lamp ${on ? 'off' : 'on '}`
			}
			tooltipPosition="bottom-left"
			iconStyle={
				on
					? { color: `rgb(${r}, ${g}, ${b})` || 'orange' }
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
