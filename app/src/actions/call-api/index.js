
import { loggedOut } from '../auth'

export const callApi = ({
	url,
	successAction: {
		type
	},
	fetchOpts
}) => (dispatch, getState) => {
	const {
		method = 'GET',
		headers: headersObj = {},
		...opts
	} = fetchOpts || {}
	const headers = new Headers();
	Object.keys(headersObj).forEach(k => headers.append(k, headersObj[k]))
	headers.append('authorization', `Bearer ${getState().auth.access_token}`)
	return fetch(url, {
		method,
		headers,
		...opts
	})
		.then(res => res.json()
			.then(body => ({
				res,
				body
			}))
		)
		.then(({ res: { status, statusText }, body }) => {
			if (status === 200) {
				dispatch({
					type,
					...body
				})
			}
			else {
				if (status === 400) {
					dispatch(loggedOut({
						message: `Please login again`
					}))
				}
				else {
					dispatch(loggedOut({
						status,
						message: `Unable to get devices - ${statusText}`
					}))
				}
			}
		})
}
