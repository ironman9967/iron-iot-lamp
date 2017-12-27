
import { TURNED_ON } from '../actions/lamp'

export default (state = {
	light: {
		on: false
	}
}, {
	type
}) => Object.assign(state, {
	light: {
		on: type === TURNED_ON
	}
})
