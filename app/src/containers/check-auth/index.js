
import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import AppBar from 'material-ui/AppBar'

export const CheckAuth = WrappedComponent => {
	const CheckAuth = ({
		isLoggedIn = false,
		pathname
	}) => (
		<div>
		{
			isLoggedIn
				? <WrappedComponent {...this.props} />
				: pathname !== '/auth'
					? <Redirect to="/auth" {...this.props}/>
					: null
		}
		</div>
	)

	const mapState = ({
		auth: {
			isLoggedIn
		},
		router: {
			location: {
				pathname
			}
		}
	}) => ({
		isLoggedIn,
		pathname
	})

	const mapDispatch = () => ({})

	return connect(mapState, mapDispatch)(CheckAuth)
}
