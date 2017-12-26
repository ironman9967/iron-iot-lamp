
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
	createDevicesRoutes,
	createLampRoutes
} from './routes'

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

	server.auth.scheme('jwt', authStrategy)
	server.auth.strategy('default', 'jwt')

	createAppRoutes().forEach(addRoute)
	createDevicesRoutes({ log }).forEach(addRoute)
	createLampRoutes({ log }).forEach(addRoute)

	await server.start()

	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
