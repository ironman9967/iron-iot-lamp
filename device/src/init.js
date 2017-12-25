
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');

let configTopic = '/devices/' + Cfg.get('device.id') + '/config';
let stateTopic = '/devices/' + Cfg.get('device.id') + '/state';

function pubState(state) {
	let stateJson = JSON.stringify(state);
	let ok = MQTT.pub(stateTopic, stateJson);
	if (ok === 1) {
		print('published state successfully:', stateJson);
	}
	else {
		print('ERROR: publish failed')
	}
}

MQTT.sub(configTopic, function(conn, topic, msg) {
	print('config update: ' + msg);
	let config = JSON.parse(msg);
	if (config) {
		if (config.light) {
			if (config.light.on) {
				print('turning on light');
				//TODO: turn on light
			}
			else {
				print('turning off light');
				//TODO: turn off light
			}
		}
	}
	pubState(config);
}, null);
