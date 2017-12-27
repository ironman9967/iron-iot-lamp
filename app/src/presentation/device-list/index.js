
import React from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

import Lamp from '../lamp'

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
		<List>
			{
				devices.map(device => (
					<ListItem primaryText={device.id} rightToggle={
						<Lamp { ...device } />
					} />
				))
			}
		</List>
	</div>
)

export default DeviceList
