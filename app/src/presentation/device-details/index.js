
import React from 'react'
import moment from 'moment'

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar'
import LinearProgress from 'material-ui/LinearProgress'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

import DeviceName from '../device-name'

import LampLightButton from '../lamp-light-button'

const styles = {
	paper: {
		margin: '10px'
	},
	deviceName: {
		paddingLeft: '10px'
	},
	lastUpdated: {
		paddingLeft: '10px',
		paddingBottom: '10px',
		fontSize: '12px'
	},
	lamp: {
		container: {
			height: '48px'
		},
		label: {
			display: 'inline-block',
			paddingLeft: '10px',
			paddingTop: '14px'
		},
		buttonContainer: {
			display: 'inline-block',
			float: 'right'
		}
	}
}

const DeviceDetails = ({
	muiTheme,
	history: { push },
	loggedOut,
	...device
}) => {
	const deviceSpecific = () => {
		switch (device.type) {
			case 'lamp':
				return (
					<div style={styles.lamp.container}>
						<div style={styles.lamp.label}>Light</div>
						<div style={styles.lamp.buttonContainer}>
							<LampLightButton {...device} />
						</div>
					</div>
				)
			default:
				return ( <div>unknown device type</div> )
		}
	}

	return (
		<div>
			<AppBar
				title="iron iot"
				iconElementLeft={
					<IconButton onClick={() => push('/devices')}>
						<NavigationArrowBack />
					</IconButton>
				}
				iconElementRight={
					<FlatButton label="logout" onClick={
						() => loggedOut({
							message: 'Logged out successfully'
						})
					} />
				}
			/>
			{
				device.id
					? <Paper style={styles.paper} zDepth={1}>
						<DeviceName style={styles.deviceName} {...device} />
						<div style={styles.lastUpdated}>
							Last updated {moment(device.meta.updatedAt).fromNow()}
						</div>
						{ deviceSpecific() }
					</Paper>
					: <LinearProgress
						mode="indeterminate"
						color={muiTheme.palette.accent1Color}
					/>
			}
		</div>
	)
}

export default muiThemeable()(DeviceDetails)
