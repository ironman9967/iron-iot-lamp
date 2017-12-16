
export const createLogger = () => ({
	logHandler: ({ data, tags }) => console.log(tags, data),
	requestLoggerExt: ({ log }) => ({
        type: 'onRequest',
        method: ({ path: url, method }, h) => {
			log(['info'], `${method.toUpperCase()} -> ${url}`)
            return h.continue;
        }
    })
})
