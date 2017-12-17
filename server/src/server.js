
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

const port = process.env.npm_package_config_port

const app = path.resolve('../app/build')

const server = new Hapi.Server({
	port,
	routes: { files: { relativeTo: app } }
})

const addRoute = route => server.route(route)
const log = (...args) => server.log.apply(server, args)

import { publishDeviceConfig } from './device'
publishDeviceConfig({
	log,
	project: process.env.npm_package_config_gcpProject,
	registry: process.env.npm_package_config_gcpIotRegistry,
	region: process.env.npm_package_config_gcpIotRegion,
	deviceId: 'esp32_0683C4'
}, { light: { on: true } }, {
	filter: ({ light: { on } }) => on,
	timeout: 10000,
	delay: 250
}).catch(console.error)

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
