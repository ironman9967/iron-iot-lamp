
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CheckAuth } from '../check-auth'

import DeviceList from '../../presentation/device-list'

import { loggedOut } from '../../actions/auth'
import { loadDevices } from '../../actions/devices'
import { nameDevice } from '../../actions/device'

class Devices extends Component {
	componentDidMount() {
		this.props.loadDevices()
	}

	render() {
		return (
			<DeviceList {
				...{
					nameDevice: this.props.nameDevice,
					loggedOut: this.props.loggedOut,
					devices: this.props.devices
				}
			} />
		)
	}
}

const mapState = ({
	devices
}) => ({
	devices
})

const mapDispatch = dispatch => ({
	loadDevices: () => dispatch(loadDevices()),
	loggedOut: ui => dispatch(loggedOut(ui)),
	nameDevice: deviceName => dispatch(nameDevice(deviceName))
})

export default CheckAuth(connect(mapState, mapDispatch)(Devices))
