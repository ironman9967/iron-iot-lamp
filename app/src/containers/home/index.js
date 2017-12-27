
import React from 'react'

import { Redirect } from 'react-router'

import { CheckAuth } from '../check-auth'

const Home = CheckAuth(() => (
	<Redirect to="/devices" />
))

export default Home
