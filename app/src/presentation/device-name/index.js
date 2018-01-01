
import React, { Component } from 'react'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/debounceTime';

import TextField from 'material-ui/TextField'

class DeviceName extends Component {
	componentDidMount () {
		this.inputValue = this.props.name
		this.inputWatcher = new Subject()
		this.inputWatcher.subscribe(name => this.inputValue = name)
		this.inputWatcher.debounceTime(1000).subscribe(name => this.saveName(name))
	}
	componentWillUnmount() {
		this.saveName()
		this.inputWatcher.complete()
	}
	saveName(name) {
		if (name) {
			this.inputValue = name
		}
		if (this.props.name !== this.inputValue) {
			this.props.nameDevice({
				id: this.props.id,
				name: this.inputValue
			})
		}
	}
	render() {
		return <TextField
			style={this.props.style}
			floatingLabelText="Device Name"
			defaultValue={this.props.display}
			onChange={(e, name) => this.inputWatcher.next(name)}
		/>
	}
}

export default DeviceName
