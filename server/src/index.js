
import 'babel-polyfill';

import { provision } from './server.js'

Promise.all([
	import (process.env.IRON_IOT_LAMP_ENV === 'LOCAL'
		? './gcp-iot-core/mock'
		: './gcp-iot-core')
]).then(([
	gcpIotCoreModule
]) => provision({
	...gcpIotCoreModule
}))
