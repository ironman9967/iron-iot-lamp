
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');

let configTopic = '/devices/' + Cfg.get('device.id') + '/config';
let stateTopic = '/devices/' + Cfg.get('device.id') + '/state';

function pubState(state) {
	let stateJson = JSON.stringify(state);
	let ok = MQTT.pub(stateTopic, stateJson);
	print('published state:', ok, stateJson);
}

let handlers = {
	'turn-on': function () {
		pubState({
			light: {
				on: true
			}
		})
	},
	'turn-off': function () {
		pubState({
			light: {
				on: false
			}
		})
	}
};

function handleCommand(command) {
	print('handling command:', JSON.stringify(command));
	let handler = handlers[command.type];
	if (handler) {
		handler(command.data);
	}
	else {
		print('ERROR: no handler found for command type - ' + command.type);
	}
}

MQTT.sub(configTopic, function(conn, topic, msg) {
	let config = JSON.parse(msg);
	if (config.commands) {
		print("processing commands in config update");
		for (let i = 0; i < config.commands.length; i++) {
			handleCommand(config.commands[i]);
		}
	}
	else {
		print("no commands found in config update");
	}
}, null);
