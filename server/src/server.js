
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

import { createLogger } from './logger'
const { logHandler, requestLoggerExt } = createLogger()

import {
	createAppRoutes,
	createLightRoutes
} from './routes'

// import { createPubsub } from './gcp-pubsub'
// const pubsub = createPubsub({
// 	projectId: process.env.npm_package_config_gcpProjectId,
// 	keyFilename: path.resolve(process.env.npm_package_config_gcpPubSubKeyfilePath)
// })
// const deviceConfigTopic = pubsub.topic(process.env.npm_package_config_gcpIotDeviceConfigTopic)
// const deviceConfigPublisher = deviceConfigTopic.publisher()
// deviceConfigPublisher.publish(new Buffer(JSON.stringify({commands:[{some:'data'}]})))
// 	.then((...args) => {
// 		console.log('publish resolve', args)
// 	})
// 	.catch(err => console.error('publish error', err))

//curl -X POST -H 'authorization: Bearer YOUR_JWT' -H 'content-type: application/json' --data '{"state": {"binary_data": "YOUR_DATA"}}' -H 'cache-control: no-cache' 'https://cloudiot-device.googleapis.com/v1beta1/projects/{project-id}/locations/{cloud-region}/registries/{registry-id}/devices/{deviceid}:setState'
// import fetch from 'node-fetch'
// import fs from 'fs'
// const token = fs.readFileSync(path.resolve(process.env.npm_package_config_gcpPubSubKeyfilePath), {encoding: 'utf8'})
// fetch(`https://cloudiot-device.googleapis.com/v1beta1/projects/iron-iot-lamp/locations/us-central1/registries/iot-registry/devices/esp32_0683C4:setState`, {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'cache-control': 'no-cache',
// 		// authorization: `Bearer ${token}`
// 	},
// 	body: JSON.stringify({
// 		state: .
// 	})
// 	// body: JSON.stringify({
// 	// 	state: {
// 	// 		binary_data: new Buffer(JSON.stringify({
// 	// 			commands:[{ some: "data" }]
// 	// 		}))
// 	// 	}
// 	// })
// }).then(function(res) {
//     return res.json();
// }).then(function(json) {
//     console.log(json);
// }).catch(console.error)

import { spawn } from 'child_process'
const updateDeviceConfig = spawn('gcloud', [
	'beta',
	'iot',
	'devices',
	'configs',
	'update',
	`--registry=iot-registry`,
	`--region=us-central1`,
	`--device=esp32_0683C4`,
	`--config-data=${JSON.stringify({
		commands: [{
			type: 'turn-on'
		}]
	})}`
])
updateDeviceConfig.stdout.on('data', console.log)
updateDeviceConfig.stderr.on('data', console.log)
updateDeviceConfig.once('close', console.log)

const port = process.env.npm_package_config_port

const app = path.resolve('../app/build')

const server = new Hapi.Server({
	port,
	routes: { files: { relativeTo: app } }
})

const addRoute = route => server.route(route)
const log = (...args) => server.log.apply(server, args)

export async function provision() {
	await server.register(Inert)

	server.events.on('log', logHandler);

	server.ext(requestLoggerExt({ log }))

	createAppRoutes().forEach(addRoute)
	createLightRoutes({ log }).forEach(addRoute)

	await server.start()

	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
