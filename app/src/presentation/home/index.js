
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

const Home = ({
	isLoggedIn
}) => (
	<div>
		<AppBar
			title="iron iot"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
    		iconElementLeft={<IconButton><ArrowBack /></IconButton>}
		/>
		{
			isLoggedIn
				? <Redirect to="/devices" />
				: <Redirect to="/auth" />
		}
	</ div>
)

const mapState = ({
	auth: {
		isLoggedIn
	}
}) => ({
	isLoggedIn
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Home)
