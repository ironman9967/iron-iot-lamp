
import React from 'react'
// import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { switchLight } from '../../actions'

const style = {
  margin: 12,
};

const Home = ({
	turnOn,
	turnOff
}) => (
    <div>
		<AppBar
			title="iron iot lamp"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
		/>
		<RaisedButton label="Turn Light On"
			primary={true}
			style={style}
			onClick={turnOn} />
		<RaisedButton label="Turn Light Off"
			primary={true}
			style={style}
			onClick={turnOff} />
    </div>
)

const mapState = () => ({})

const mapDispatch = dispatch => ({
	turnOn: () => dispatch(switchLight.turnOn()),
	turnOff: () => dispatch(switchLight.turnOff())
})

export default connect(mapState, mapDispatch)(Home)
