
import React from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar'
import LinearProgress from 'material-ui/LinearProgress'
import FlatButton from 'material-ui/FlatButton'
import List from 'material-ui/List'

import DeviceListItem from '../device-list-item'

const DeviceList = ({
	devices,
	...props
}) => (
	<div>
		<AppBar
			title="iron iot"
			titleStyle={{cursor: 'pointer'}}
			onTitleClick={() => props.history.push('/app/devices')}
			showMenuIconButton={false}
			iconElementRight={<FlatButton label="logout" onClick={
				() => props.loggedOut({
					message: 'Logged out successfully'
				})
			} />}
		/>
		{
			devices.length === 0
				? <LinearProgress
					mode="indeterminate"
					color={props.muiTheme.palette.accent1Color}
				/>
				: <List>{ devices.map(device =>
					<DeviceListItem { ...{ ...device, ...props } } />
				)}</List>
		}
	</div>
)

export default muiThemeable()(DeviceList)
