
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CheckAuth } from '../check-auth'

import { loggedOut } from '../../actions/auth'
import { getDeviceState, nameDevice } from '../../actions/device'
import {
	toggleLight,
	setLedArray
} from '../../actions/lamp'

import DeviceDetails from '../../presentation/device-details'

class Device extends Component {
	getIdFromRoute() {
		const route = this.props.location.pathname.split('/')
		const [,,, id] = route
		return id
	}

	componentWillMount() {
		if (this.props.devices.length === 0) {
			this.props.getDeviceState(this.getIdFromRoute())
		}
	}

	render() {
		const device = this.props.devices.find(d =>
			d.id === this.getIdFromRoute()
		)
		return (
			<DeviceDetails {
				...{
					...device,
					...this.props
				}
			}/>
		)
	}
}

const mapState = ({
	devices
}) => ({
	devices
})

const mapDispatch = dispatch => ({
	loggedOut: ui => dispatch(loggedOut(ui)),
	getDeviceState: id => dispatch(getDeviceState(id)),
	nameDevice: ({ id, name }) => dispatch(nameDevice({ id, name })),
	toggleLight: ({ id }) => dispatch(toggleLight({ id })),
	setLedArray: ({ id, array }) => dispatch(setLedArray({ id, array }))
})

export default CheckAuth(connect(mapState, mapDispatch)(Device))
