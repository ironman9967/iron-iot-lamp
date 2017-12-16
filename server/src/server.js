
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

import { createPubsub } from './gcp-pubsub'
const pubsub = createPubsub({
	projectId: process.env.npm_package_config_gcpProjectId,
	keyFilename: path.resolve(process.env.npm_package_config_gcpPubSubKeyfilePath)
})
const deviceConfigTopic = pubsub.topic(process.env.npm_package_config_gcpIotDeviceConfigTopic)
const deviceConfigPublisher = deviceConfigTopic.publisher()
deviceConfigPublisher.publish(new Buffer(JSON.stringify({commands:[]})))
	.then((...args) => {
		console.log('publish resolve', args)
	})
	.catch(err => console.error('publish error', err))

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
