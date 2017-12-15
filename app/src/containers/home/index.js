
import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

// import actions from '../../actions'
//
// console.log(actions)

const style = {
  margin: 12,
};

const Home = ({
	onTurnOn
}) => (
    <div>
		<AppBar
			title="iron iot lamp"
			showMenuIconButton={false}
			iconClassNameRight="muidocs-icon-navigation-expand-more"
		/>
		<RaisedButton label="Turn Light On" primary={true} style={style} onClick={onTurnOn}/>
		<RaisedButton label="Turn Light Off" primary={true} style={style} />
    </div>
)

const mapState = ({

}) => ({

})

const mapDispatch = dispatch => ({
	onTurnOn: () => dispatch({
		type: 'turn-on'
	})
})

export default connect(mapState, mapDispatch)(Home)
