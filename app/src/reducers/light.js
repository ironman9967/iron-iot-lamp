
import { light } from '../actions'
const { TURN_ON } = light

export default (state = {
	on: false
}, {
	type
}) => ({
	on: type === TURN_ON
})
