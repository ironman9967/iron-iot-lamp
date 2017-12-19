
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'

import { devices } from '../../actions'
const { setDeviceList }  = devices

class Devices extends Component {
	componentWillMount() {
		fetch('/api/devices')
			.then(res => res.json())
			.then(this.props.setDeviceList)
	}

	render() {
		return (
			<List>
				{
					this.props.devices.map(({
						id
					}) => (
						<ListItem primaryText={id} />
					))
				}
			</List>
		)
	}
}

const mapState = ({
	devices
}) => ({
	devices
})

const mapDispatch = dispatch => ({
	setDeviceList: devices => dispatch(setDeviceList(devices))
})

export default connect(mapState, mapDispatch)(Devices)
