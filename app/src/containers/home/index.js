
import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import { CheckAuth } from '../check-auth'

const Home = ({
	pathname
}) => {
	if (pathname === '/' || pathname === '/auth') {
		pathname = '/devices'
	}
	return (
		<Redirect to={pathname} />
	)
}

const mapState = ({
	router: {
		location: {
			pathname
		}
	}
}) => ({
	pathname
})

const mapDispatch = dispatch => ({})

export default CheckAuth(connect(mapState, mapDispatch)(Home))
