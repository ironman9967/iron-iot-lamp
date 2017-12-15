
export default {
	app: (state = {
	    started: new Date().getTime()
	}, action) => ({
		...state,
		...action
	})
}
