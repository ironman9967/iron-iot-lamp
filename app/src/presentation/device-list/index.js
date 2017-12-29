
import React from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import List from 'material-ui/List'

import Device from '../../containers/device'

const DeviceList = ({
	devices,
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
		<List>{ devices.map(device => <Device { ...{
			presentation: 'list-item', //TODO: trying to make device a route!
			...device
		} }/>) }</List>
	</div>
)

export default DeviceList
