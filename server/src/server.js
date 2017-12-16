
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

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

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    })

	await server.start()
	server.events.on('log', ({ data, tags }) => console.log(tags, data));
	server.log(['debug'], `serving app from ${app}`)
	server.log(['info'], `server up on ${port}`)
}
