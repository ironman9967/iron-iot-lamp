
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import { List, ListItem } from 'material-ui/List'

import { CheckAuth } from '../check-auth'

import Lamp from '../../presentation/lamp'

import { devices, auth } from '../../actions'
const { setDeviceList }  = devices
const { loggedOut } = auth

class Devices extends Component {
	componentDidMount() {
		const headers = new Headers();
		headers.append('authorization', `${this.props.token.type} ${this.props.token.jwt}`)
		fetch('/api/devices', {
			method: 'GET',
			headers
		})
			.then(res => res.json()
				.then(body => ({
					res,
					body
				}))
			)
			.then(({ res: { status, statusText }, body }) => {
				if (status === 200) {
					this.props.setDeviceList(body)
				}
				else if (status === 400) {
					this.props.loggedOut({
						message: `Please login again`
					})
				}
				else {
					this.props.loggedOut({
						status,
						message: `Unable to get devices - ${statusText}`
					})
				}
			})
	}

	render() {
		return (
			<div>
				<AppBar
					title="iron iot"
					showMenuIconButton={false}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<List>
					{
						this.props.devices.map(({
							id
						}) => (
							<ListItem primaryText={id} rightToggle={
								<Lamp />
							} />
						))
					}
				</List>
			</div>
		)
	}
}

const mapState = ({
	devices,
	auth: { googleAuth: { tokenObj: { token_type, id_token } } }
}) => ({
	devices,
	token: {
		type: token_type,
		jwt: id_token
	}
})

const mapDispatch = dispatch => ({
	setDeviceList: devices => dispatch(setDeviceList(devices)),
	loggedOut: err => dispatch(loggedOut(err))
})

export default CheckAuth(connect(mapState, mapDispatch)(Devices))
