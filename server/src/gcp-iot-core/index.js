
import { spawn } from 'child_process'
import path from 'path'

import pubsub from '@google-cloud/pubsub'

const handleSpawn = proc => new Promise((resolve, reject) => {
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
	})
})

export const pubDeviceConfig = ({
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
]))

export const getDeviceState = ({
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
	return JSON.parse(json)
})
