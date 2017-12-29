
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CheckAuth } from '../check-auth'

import DeviceList from '../../presentation/device-list'

import { loggedOut } from '../../actions/auth'
import { loadDevices } from '../../actions/devices'

class Devices extends Component {
	componentDidMount() {
		this.props.loadDevices()
	}

	render() {
		return (
			<DeviceList { ...this.props } />
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
	loggedOut: ui => dispatch(loggedOut(ui))
})

export default CheckAuth(connect(mapState, mapDispatch)(Devices))
