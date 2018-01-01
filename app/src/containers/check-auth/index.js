
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import { loadAccessToken } from '../../actions/auth'

export const CheckAuth = WrappedComponent => {
	class CheckAuth extends Component {
		componentWillMount() {
			if (this.props.access_token === void 0) {
				this.props.loadAccessToken()
			}
		}

		render() {
			const {
				access_token,
				pathname,
				loadAccessToken,
				...wrappedComponentProps
			} = this.props
			if (access_token) {
				return <WrappedComponent { ...wrappedComponentProps }/>
			}
			if (access_token === null && pathname !== '/auth') {
				return <Redirect to="/app/auth" />
			}
			return null
		}
	}

	const mapState = ({
		auth: {
			access_token
		},
		router: {
			location: {
				pathname
			}
		}
	}) => ({
		access_token,
		pathname
	})

	const mapDispatch = dispatch => ({
		loadAccessToken: () => dispatch(loadAccessToken())
	})

	return connect(mapState, mapDispatch)(CheckAuth)
}
