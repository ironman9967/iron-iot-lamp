
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import { loadAccessToken } from '../../actions/auth'

export const CheckAuth = WrappedComponent => {
	class CheckAuth extends Component {
		componentDidMount() {
			if (!this.props.access_token) {
				this.props.loadAccessToken()
			}
		}

		render() {
			if (this.props.isLoggedIn || this.props.access_token) {
				return <WrappedComponent />
			}
			else if (this.props.pathname !== '/auth') {
				return <Redirect to="/auth" />
			}
			else {
				return null
			}
		}
	}

	const mapState = ({
		auth: {
			isLoggedIn,
			access_token
		},
		router: {
			location: {
				pathname
			}
		}
	}) => ({
		isLoggedIn,
		access_token,
		pathname
	})

	const mapDispatch = dispatch => ({
		loadAccessToken: () => dispatch(loadAccessToken())
	})

	return connect(mapState, mapDispatch)(CheckAuth)
}
