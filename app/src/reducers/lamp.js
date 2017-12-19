
import { lamp } from '../actions'
const { TURNED_ON } = lamp

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
