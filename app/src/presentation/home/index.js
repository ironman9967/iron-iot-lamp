
import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import { CheckAuth } from '../../containers/check-auth'

const Home = CheckAuth(() => (
	<Redirect to="/devices" />
))

const mapState = () => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Home)
