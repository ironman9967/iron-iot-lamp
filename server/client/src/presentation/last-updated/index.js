
import React, { Component } from 'react'
import moment from 'moment'

const styles = {
	lastUpdated: {
		paddingTop: '10px',
		paddingLeft: '10px',
		paddingBottom: '10px',
		fontSize: '12px'
	}
}

class LastUpdated extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lastUpdated: '...'
		}
	}

	delayUpdate() {
		this.displayUpdater = setTimeout(() => this.updateLastUpdated(), 1000)
	}

	updateLastUpdated() {
		if (this.props.updatedAt !== void 0) {
			this.setState({
				lastUpdated: moment(this.props.updatedAt).fromNow()
			})
		}
		this.delayUpdate()
	}

	componentDidMount() {
		this.delayUpdate()
	}

	componentWillUnmount() {
		clearTimeout(this.displayUpdater)
	}

	render() {
		return (
			<div style={styles.lastUpdated}>
				Last updated {this.state.lastUpdated}
			</div>
		)
	}
}

export default LastUpdated
