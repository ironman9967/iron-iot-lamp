
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

import { createLogger } from './logger'
const { logHandler, requestLoggerExt } = createLogger()

import { createAuthStrategy } from './auth'
const authStrategy = createAuthStrategy()

import {
	createAppRoutes,
	createHealthCheckRoutes,
	createDevicesRoutes,
	createDeviceRoutes,
	createLampRoutes
} from './routes'

const port = process.env.PORT
const project = process.env.GCP_PROJECT
const region = process.env.GCP_REGION
const registry = process.env.GCP_IOT_REGISTRY

const app = path.resolve('./client/build')

const server = new Hapi.Server({
	port,
	routes: { files: { relativeTo: app } }
})

const addRoute = route => server.route(route)
const log = (...args) => server.log.apply(server, args)

const gcpIotCoreQueue = []

export async function provision() {
	await server.register(Inert)

	server.events.on('log', logHandler);

	server.ext(requestLoggerExt({ log }))

	server.auth.scheme('jwt', authStrategy)
	server.auth.strategy('default', 'jwt')

	createAppRoutes().forEach(addRoute)
	createHealthCheckRoutes().forEach(addRoute)
	createDevicesRoutes({
		log,
		gcpIotCoreQueue,
		registry,
		region,
		project
	}).forEach(addRoute)
	createDeviceRoutes({
		log,
		gcpIotCoreQueue,
		registry,
		region,
		project
	}).forEach(addRoute)
	createLampRoutes({
		log,
		registry,
		region,
		project
	}).forEach(addRoute)

	await server.start()

	process.once('SIGTERM', () => {
		server.log(['debug'], 'server shutting down')
		server.stop()
	})

	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
