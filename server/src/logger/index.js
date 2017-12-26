
export const createLogger = () => ({
	logHandler: ({ data, tags }) => console.log(tags, data),
	requestLoggerExt: ({ log }) => ({
        type: 'onRequest',
        method: (req, h) => {
			const { path: url, method } = req
			log(['info'], `${method.toUpperCase()} -> ${url}`)
            return h.continue;
        }
    })
})
