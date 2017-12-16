
import React from 'react'
// import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';

import { light } from '../../actions'
const {
	turnOn,
	turnOff
} = light

const styles = {
	block: {
		maxWidth: 250
	},
	toggle: {
		marginTop: 16,
		marginLeft: 16,
		marginBottom: 16
	},
	thumbOff: {
		backgroundColor: '#ffcccc'
	},
	trackOff: {
		backgroundColor: '#ff9d9d'
	},
	thumbSwitched: {
		backgroundColor: 'red'
	},
	trackSwitched: {
		backgroundColor: '#ff9d9d'
	},
	labelStyle: {
		color: 'red'
	}
}

const Home = ({
	switchLight
}) => (
	<div>
		<AppBar
			title="iron iot lamp"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
		/>
		<div style={styles.block}>
			<Toggle
		      label="Light"
		      style={styles.toggle}

			  onToggle={(event, isInputChecked) => switchLight(isInputChecked)}
		    />
	    </div>
	</ div>
)

const mapState = ({
	switchLight
}) => ({})

const mapDispatch = dispatch => ({
	switchLight: on => dispatch(on ? turnOn() : turnOff())
})

export default connect(mapState, mapDispatch)(Home)
