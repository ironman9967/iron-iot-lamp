
import React from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import List from 'material-ui/List'

import DeviceListItem from '../../presentation/device-list-item'

const DeviceList = ({
	devices,
	nameDevice,
	loggedOut
}) => (
	<div>
		<AppBar
			title="iron iot"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
			iconElementRight={<FlatButton label="logout" onClick={
				() => loggedOut({
					message: 'Logged out successfully'
				})
			} />}
		/>
		<List>
			{
				devices.map(device => <DeviceListItem { 
					...{
						...device,
						nameDevice
					}
				}/>)
			}
		</List>
	</div>
)

export default DeviceList
