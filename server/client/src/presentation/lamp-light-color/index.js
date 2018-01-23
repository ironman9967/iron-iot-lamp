
import React, { Component } from 'react'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/debounceTime';

import muiThemeable from 'material-ui/styles/muiThemeable';
import LinearProgress from 'material-ui/LinearProgress'

import { SliderPicker } from 'react-color'

const styles = {}

class LampLightColor extends Component {
	componentDidMount () {
		this.color = this.props.light.led.color
		this.inputWatcher = new Subject()
		this.inputWatcher.subscribe(color => {
			this.color = color
		})
		this.inputWatcher.debounceTime(1000).subscribe(color => this.saveColor(color))
	}

	componentWillUnmount() {
		this.props.setLedColor({
			id: this.props.id,
			color: this.color
		})
		this.inputWatcher.complete()
	}

	saveColor(color) {
		const { r: curR, g: curG, b: curB, w: curW } = this.props.light.led.color
		const { r: newR, g: newG, b: newB, w: newW } = color
		if (newR !== curR || newG !== curG || newB !== curB || newW !== curW) {
			this.props.setLedColor({
				id: this.props.id,
				color
			})
		}
	}

	render() {
		return (
			<SliderPicker
				color={ this.color || this.props.light.led.color }
				onChange={({ rgb: color }) => this.inputWatcher.next(color)}
			/>
		)
	}
}

export default muiThemeable()(LampLightColor)
