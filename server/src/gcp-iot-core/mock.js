
const delay = 500

export const createGcpIotCore = ({
	log,
	queue = [],
	currentConfig = {
		"name": "living room neopixel lamp",
		"light": {
			"on": true,
			"led": {
				"model": "neopixel strip",
				"type": "RGBW",
				"count": 60,
				"color": {
					"w": 0,
					"b": 64,
					"g": 158,
					"r": 191
				}
			},
			"animation": {
				"current": null,
				"available": []
			}
		},
		"meta": {
			"updatedAt": 1516739283789
		},
		"type": "lamp",
		"id": "esp32_237498"
	}
}) => ({
	pubDeviceConfig: ({
		project,
		registry,
		region,
		deviceId,
		config
	}) => {
		currentConfig = config
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve('PUBLISH MOCKED'), delay)
		})
	},

	getDeviceState: ({
		project,
		registry,
		region,
		deviceId
	}) => new Promise((resolve, reject) => {
		setTimeout(() => resolve(currentConfig), delay)
	}),

	getDevices: ({
		registry,
		region,
		project
	}) => new Promise((resolve, reject) => {
		setTimeout(() => resolve([
			currentConfig
		]), delay)
	})
})
