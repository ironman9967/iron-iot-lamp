
import React from 'react'

import IconButton from 'material-ui/IconButton'

import CircularProgress from 'material-ui/CircularProgress'
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline'

const styles = {
	iconButton: {
	    width: 64,
	    height: 64
	},
	icon: {
	    width: 36,
	    height: 36
	},
	spinner: {
		marginRight: 12,
		marginTop: 12
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
}) => {
	if (on) {
		styles.icon.color = r != void 0
			? `rgb(${r}, ${g}, ${b})`
			: 'orange'
	}
	else {
		styles.icon.color = 'black'
	}
	return !updating
		? (
			<IconButton
				style={{ ...styles.iconButton }}
				iconStyle={{ ...styles.icon }}
				onClick={() => toggleLight({ id })}
				tooltip={
					`turn lamp ${on ? 'off' : 'on'}`
				}
				tooltipPosition="bottom-left"
			>
				<LightBulbIcon />
			</IconButton>
		)
		: (
			<CircularProgress style={{ ...styles.spinner }} />
		)
}

export default LampLightButton
