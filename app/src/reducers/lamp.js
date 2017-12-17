
import { lamp } from '../actions'
const { TURN_ON } = lamp

export default (state = {
	on: false
}, {
	type
}) => ({
	on: type === TURN_ON
})
