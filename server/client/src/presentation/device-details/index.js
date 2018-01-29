
import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar'
import LinearProgress from 'material-ui/LinearProgress'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import DeviceName from '../device-name'
import LastUpdated from '../last-updated'
import LampLightButton from '../lamp-light-button'
import LampLightColor from '../lamp-light-color'

const styles = {
	appBarTitle: {
		cursor: 'pointer'
	},
	paper: {
		margin: 10
	},
	deviceHeader: {
		paddingTop: 10,
		paddingLeft: 10,
		fontSize: 30
	},
	deviceName: {
		paddingLeft: 10
	},
	lamp: {
		header: {
			display: 'flex',
			flexWrap: 'wrap',
			paddingTop: 10,
			paddingLeft: 10
		},
		chips: {
			margin: 4,
			fontSize: 12
		},
		toggle: {
			container: {
				height: 64
			},
			label: {
				display: 'inline-block',
				paddingLeft: 10,
				paddingTop: 25
			},
			buttonContainer: {
				display: 'inline-block',
				float: 'right'
			}
		},
		color: {
			container: {
				height: 70,
				width: 'calc(100% - 20px)'
			},
			sliderContainer: {
				display: 'inline-block',
				width: '100%',
				paddingTop: 10,
				paddingLeft: 10,
				paddingRight: 10
			}
		}
	}
}

const DeviceDetails = ({
	muiTheme,
	history: { push },
	loggedOut,
	...device
}) => {
	const deviceSpecificHeader = () => {
		switch (device.type) {
			case 'lamp':
				return (
					<div style={styles.lamp.header}>
						<Chip style={styles.lamp.chips}>
							{device.light.led.model}
						</Chip>
						<Chip style={styles.lamp.chips}>
							{device.light.led.type}
						</Chip>
					</div>
				)
			default:
				return ( <div>unknown device type</div> )
		}
	}

	const deviceSpecificControls = () => {
		switch (device.type) {
			case 'lamp':
				return (
					<div>
						<div style={styles.lamp.toggle.container}>
							<div style={styles.lamp.toggle.label}>Light</div>
							<div style={styles.lamp.toggle.buttonContainer}>
								<LampLightButton {...device} />
							</div>
						</div>
						<div style={styles.lamp.color.container}>
							<div style={styles.lamp.color.sliderContainer}>
								<LampLightColor {...device} />
							</div>
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
				titleStyle={styles.appBarTitle}
				onTitleClick={() => push('/app/devices')}
				iconElementLeft={
					<IconButton onClick={() => push('/app/devices')}>
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
						<div>
							<div style={styles.deviceHeader}>
								{ device.type }
							</div>
							{ deviceSpecificHeader() }
						</div>
						<DeviceName style={styles.deviceName} {...device} />
						<LastUpdated {...{
							updatedAt: device.meta.updatedAt
						}} />
						{ deviceSpecificControls() }
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
