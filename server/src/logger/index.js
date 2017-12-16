
export const createLogger = () => ({
	logHandler: ({ data, tags }) => console.log(tags, data)
})
