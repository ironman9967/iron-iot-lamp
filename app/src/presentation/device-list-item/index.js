
import React from 'react'

import { ListItem } from 'material-ui/List'

import WarningIcon from 'material-ui/svg-icons/alert/warning'
import BuildIcon from 'material-ui/svg-icons/action/build'
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline'

const styles = {
	pending: {
		color: 'gray'
	}
}

const DeviceListItem = ({
	history: {
		push
	},
	...device
}) => {
	const {
		id,
		name,
		type
	} = device
	const li = {
		key: id,
		onClick: () => push(`/app/device/${id}`)
	}
	if (!type) {
		li.style = styles.pending
		li.disabled = true
		li.rightIcon = ( <WarningIcon /> )
	}
	else {
		if (name) {
			switch (type) {
				case 'lamp':
					li.rightIcon = ( <LightBulbIcon /> )
					break;
			}
		}
		else {
			li.rightIcon = ( <BuildIcon /> )
		}
	}
	li.primaryText = device.display
	return <ListItem { ...li } />
}

export default DeviceListItem
