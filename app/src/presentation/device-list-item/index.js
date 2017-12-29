
import React from 'react'

import { ListItem } from 'material-ui/List'

import WarningIcon from 'material-ui/svg-icons/alert/warning';
import BuildIcon from 'material-ui/svg-icons/action/build';

import DeviceName from '../device-name'
import LampLightButton from '../lamp-light-button'

const styles = {
	pending: {
		color: 'gray'
	}
}

const DeviceListItem = ({
	id,
	type,
	name,
	nameDevice,
	toggleLight,
	...device
}) => {
	const li = {
		key: id
	}
	if (!type) {
		li.style = styles.pending
		li.primaryText = `Pending Device - ${id}`
		li.disabled = true
		li.rightIcon = ( <WarningIcon /> )
	}
	else {
		let display
		if (name) {
			display = name
			switch (type) {
				case 'lamp':
					li.rightIconButton = (
						<LampLightButton {
							...{
								style: {
									top: void 0,
									...li.style
								},
								id,
								...device,
								toggleLight
							}
						}/>
					)
					break;
			}
		}
		else {
			display = `New Device - ${id}`
			li.rightIcon = ( <BuildIcon /> )
		}
		li.primaryText = (
			<DeviceName {
				...{
					id,
					name,
					display,
					nameDevice
				}
			}/>
		)
	}
	return <ListItem { ...li } />
}

export default DeviceListItem
