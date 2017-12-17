
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter';

import { pubDeviceConfig, getDeviceState } from '../gcp-iot-core'

// import { publishDeviceConfig } from './device'
// publishDeviceConfig({
// 	log,
// 	project: process.env.npm_package_config_gcpProject,
// 	registry: process.env.npm_package_config_gcpIotRegistry,
// 	region: process.env.npm_package_config_gcpIotRegion,
// 	deviceId: 'esp32_0683C4'
// }, { light: { on: true } }, {
// 	filter: ({ light: { on } }) => on,
// 	timeout: 10000,
// 	delay: 250
// }).catch(console.error)

export const publishDeviceConfig = ({
	log,
	project,
	registry,
	region,
	deviceId
}, newConfig, {
	filter,
	timeout = 10000,
	delay = 250
}) => new Promise((resolve, reject) => {
	const deviceStateUpdate = new Subject()
	const config = Object.assign(newConfig, { meta: { updatedAt: new Date().getTime() } })
	log(['debug'], `publishing config: ${JSON.stringify(config)}`)

	let timedout = false, complete = false
	const updateTimeout = setTimeout(() => {
		log(['error'], 'state update timed out')
		timedout = true
	}, timeout)

	getDeviceState({ registry, region, deviceId })
		.then(currentState => {
			log(['debug'], `current state - ${JSON.stringify(currentState)}`)
			return pubDeviceConfig({
				project,
				registry,
				region,
				deviceId,
				config: Object.assign(currentState, config)
			})
		})
		.then(configPublishOutput => {
			log(['debug'], configPublishOutput)
			const monitor = delay => setTimeout(() => {
				if (timedout) {
					deviceStateUpdate.error({ error: 'timeout' })
					complete = true
				}
				if (complete) {
					deviceStateUpdate.complete()
					return
				}
				getDeviceState({ registry, region, deviceId })
					.then(currentState => {
						log(['debug'], `current state - ${JSON.stringify(currentState)}`)
						deviceStateUpdate.next(currentState)
						monitor(delay)
					})
			})

			deviceStateUpdate.filter(filter).subscribe(deviceState => {
				timedout = false
				complete = true
				clearTimeout(updateTimeout)
				log(['debug'], `config publish matched device state - ${JSON.stringify(deviceState)}`)
				resolve(deviceState)
			}, reject)

			monitor(delay)
		})
		.catch(err => {
			log(['error'], err)
			clearTimeout(updateTimeout)
			reject(err)
		})
})
