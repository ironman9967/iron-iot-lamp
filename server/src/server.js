
import path from 'path'
import url from 'url'

import Hapi from 'hapi'
import Inert from 'inert'

const port = process.env.npm_package_config_port

const appPublic = path.resolve('../app/build')

const server = new Hapi.Server({
	port,
	routes: {
		files: {
			relativeTo: appPublic
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
	server.log(['info'], `serving app from ${appPublic}`)
	server.log(['info'], `server up on ${port}`)
}
