
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

import { createLogger } from './logger'
const { logHandler } = createLogger()

import {
	createAppRoute
} from './routes'

const port = process.env.npm_package_config_port

const app = path.resolve('../app/build')

const server = new Hapi.Server({
	port,
	routes: {
		files: {
			relativeTo: app
		}
	}
})

export async function provision() {
	await server.register(Inert)

	server.events.on('log', logHandler);

    server.route(createAppRoute())

	await server.start()

	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
