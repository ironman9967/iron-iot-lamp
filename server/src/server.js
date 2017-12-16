
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

import { createLogger } from './logger'
const { logHandler } = createLogger()

import {
	createAppRoutes,
	createLightRoutes
} from './routes'

const port = process.env.npm_package_config_port

const app = path.resolve('../app/build')

const server = new Hapi.Server({
	port,
	routes: { files: { relativeTo: app } }
})

const addRoute = route => server.route(route)

export async function provision() {
	await server.register(Inert)

	server.events.on('log', logHandler);

	createAppRoutes().forEach(addRoute)
	createLightRoutes({
		log: (...args) => server.log.apply(server, args)
	}).forEach(addRoute)

	await server.start()

	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
