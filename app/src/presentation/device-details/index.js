
import React, { Component } from 'react'
import moment from 'moment'

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar'
import LinearProgress from 'material-ui/LinearProgress'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import DeviceName from '../device-name'

import LampLightButton from '../lamp-light-button'

const styles = {
	appBarTitle: {
		cursor: 'pointer'
	},
	paper: {
		margin: '10px'
	},
	deviceHeader: {
		paddingTop: '10px',
		paddingLeft: '10px',
		fontSize: '30px'
	},
	deviceName: {
		paddingLeft: '10px'
	},
	lastUpdated: {
		paddingTop: '10px',
		paddingLeft: '10px',
		paddingBottom: '10px',
		fontSize: '12px'
	},
	lamp: {
		header: {
			display: 'flex',
			flexWrap: 'wrap',
			paddingTop: '10px',
			paddingLeft: '10px'
		},
		chips: {
			margin: '4px',
			fontSize: '12px'
		},
		toggle: {
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
}

class DeviceDetails extends Component {
	constructor(props) {
		super(props)
		this.delay = 500
		this.state = {
			lastUpdated: '...'
		}
	}

	delayUpdate() {
		this.displayUpdater =
			setTimeout(() => this.updateLastUpdated(), this.delay)
	}

	updateLastUpdated() {
		const state = {}
		if (this.props.meta && this.props.meta.updatedAt !== void 0) {
			state.lastUpdated = moment(this.props.meta.updatedAt).fromNow()
			this.delay = 10000
		}
		else {
			state.lastUpdated = '...'
		}
		this.setState(state)
		this.delayUpdate()
	}

	componentDidMount() {
		this.delayUpdate()
	}

	componentWillUnmount() {
		clearInterval(this.displayUpdater)
	}

	render() {
		const {
			muiTheme,
			history: { push },
			loggedOut,
			...device
		} = this.props

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
						<div style={styles.lamp.toggle.container}>
							<div style={styles.lamp.toggle.label}>Light</div>
							<div style={styles.lamp.toggle.buttonContainer}>
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
							<div style={styles.lastUpdated}>
								Last updated {this.state.lastUpdated}
							</div>
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
}

export default muiThemeable()(DeviceDetails)
