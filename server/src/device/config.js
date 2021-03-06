
import { merge } from 'lodash'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter';

export const createConfig = ({
	log,
	gcpIotCore: {
		pubDeviceConfig,
		getDeviceState
	}
}) => ({
	getDeviceState,
	publishDeviceConfig: ({
		project,
		registry,
		region,
		deviceId
	}, newConfig, {
		filter,
		timeout = 30000,
		delay = 250
	}) => new Promise((resolve, reject) => {
		const deviceStateUpdate = new Subject()
		const config = merge(newConfig, {
			meta: merge(newConfig.meta || {}, { updatedAt: new Date().getTime() })
		})
		log(['debug'], `publishing config: ${JSON.stringify(config)}`)

		let timedout = false, complete = false
		const updateTimeout = setTimeout(() => {
			log(['error'], 'state update timed out')
			timedout = true
		}, timeout)

		getDeviceState({ project, registry, region, deviceId })
			.then(currentState => {
				log(['debug'], `current state - ${JSON.stringify(currentState)}`)
				return pubDeviceConfig({
					project,
					registry,
					region,
					deviceId,
					config: merge(currentState, config)
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
					getDeviceState({ project, registry, region, deviceId })
						.then(currentState => {
							log(['debug'], `current state - ${JSON.stringify(currentState)}`)
							deviceStateUpdate.next(currentState)
							monitor(delay)
						})
				}, delay)

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
})
