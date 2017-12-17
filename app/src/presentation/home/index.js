
import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';

import { lamp } from '../../actions'
const {
	turnOn,
	turnOff
} = lamp

class Home extends Component {
    componentWillMount() {
		
    }

    render() {
        return (
			<div>
				<AppBar
					title="iron iot"
					showMenuIconButton={false}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
			</ div>
        )
    }
}

const mapState = () => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Home)
