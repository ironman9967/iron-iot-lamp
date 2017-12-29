
import React from 'react'
import { connect } from 'react-redux'

import { CheckAuth } from '../check-auth'

import { nameDevice } from '../../actions/device'
import { toggleLight } from '../../actions/lamp'

import DeviceListItem from '../../presentation/device-list-item'

const Device = ({
	presentation: { mode },
	...device
}) => {
	if (mode === 'list-item') {
		return (
			<DeviceListItem { ...device }/>
		)
	}
	else {
		return (
			<div>`device details: ${JSON.stringify(device)}`</div>
		)
	}
}

const mapState = () => ({})

const mapDispatch = dispatch => ({
	nameDevice: deviceName => dispatch(nameDevice(deviceName)),
	toggleLight: device => dispatch(toggleLight(device))
})

export default CheckAuth(connect(mapState, mapDispatch)(Device))
