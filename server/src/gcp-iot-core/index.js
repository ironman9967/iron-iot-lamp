
import { spawn } from 'child_process'
import path from 'path'

import pubsub from '@google-cloud/pubsub'

export const createGcpIotCore = ({
	queue = []
}) => {
	let working = false

	const handleSpawn = proc => {
		if (working) {
			return new Promise((resolve, reject) => queue.push({
				proc,
				resolve,
				reject
			}))
		}
		return new Promise((resolve, reject) => doSpawn({
			proc,
			resolve,
			reject
		}))
	}

	const checkForWork = () => {
		const work = queue.pop()
		if (work) {
			doSpawn(work)
		}
		else {
			working = false
		}
	}

	const doSpawn = ({ proc, resolve, reject }) => {
		working = true
		const trimLastChar = s => {
			s = s.toString()
			return s.substring(0, s.length - 1)
		}
		let output = ''
		proc.stdout.on('data', data => output += trimLastChar(data))
		proc.stderr.on('data', data => output += trimLastChar(data))
		proc.once('close', code => {
			code === 0 ?
			resolve(output) :
			reject({ code, error: output })
			checkForWork()
		})
	}

	return {
		pubDeviceConfig: ({
			project,
			registry,
			region,
			deviceId,
			config
		}) => handleSpawn(spawn('gcloud', [
			'beta',
			'iot',
			'devices',
			'configs',
			'update',
			`--project=${project}`,
			`--registry=${registry}`,
			`--region=${region}`,
			`--device=${deviceId}`,
			`--config-data=${JSON.stringify(config)}`
		])),

		getDeviceState: ({
			registry,
			region,
			deviceId
		}) => handleSpawn(spawn('gcloud', [
			'beta',
			'iot',
			'devices',
			'describe',
			deviceId,
			`--registry=${registry}`,
			`--region=${region}`
		])).then(output => {
			const base64State = output.match(/state:\s*binaryData: (.*)\n/)[1]
			const json = Buffer.from(base64State, 'base64')
			return {
				id: deviceId,
				...JSON.parse(json)
			}
		}),

		getDevices: ({
			registry,
			region,
			project
		}) => handleSpawn(spawn('gcloud', [
			'beta',
			'iot',
			'devices',
			'list',
			`--project=${project}`,
			`--registry=${registry}`,
			`--region=${region}`
		])).then(output =>
			output.match(/\n\S+\s+\S+/g)
				.map(deviceLine => deviceLine.match(/(\S+)\s+\S+/)[1]))
	}
}
