
import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

class DeviceName extends Component {
	render() {
		const saveName = () => this.props.name !== this.state.name
			? this.props.nameDevice({
				id: this.props.id,
				name: this.state.name
			})
			: null
		const elementId = `DeviceName-${this.props.id}`
		return (
			<TextField
				id={elementId}
				defaultValue={this.props.display}
				onBlur={saveName}
				onKeyUp={({ key }) => {
					if (key === 'Enter') {
						document.getElementById(elementId).blur()
						saveName()
					}
				}}
				onChange={(e, name) =>
					this.props.name !== name
						? this.setState(() => ({ name }))
						: null
				}
			/>
		)
	}
}

export default DeviceName
