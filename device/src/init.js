
load("api_bitbang.js");
load("api_sys.js");
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let NeoPixel = {
	create: function(pin, numPixels) {
		GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
		GPIO.write(pin, 0);
		let s = Object.create({
			pin: pin,
			len: numPixels * 4,
			data: Sys.malloc(numPixels * 4),
			setPixel: NeoPixel.set,
			clear: NeoPixel.clear,
			show: NeoPixel.show,
		});
		s.clear();
		return s;
	},
	set: function(pixel, color) {
		this.data[pixel * 4] = color.g;
		this.data[pixel * 4 + 1] = color.r;
		this.data[pixel * 4 + 2] = color.b;
		this.data[pixel * 4 + 3] = color.w;
	},
	clear: function() {
		for (let i = 0; i < this.len; i++) {
			this.data[i] = 0;
		}
	},
	show: function() {
		GPIO.write(this.pin, 0);
		Sys.usleep(50);
		BitBang.write(this.pin, BitBang.DELAY_100NSEC, 4, 8.5, 8, 4.5, this.data, this.len);
		GPIO.write(this.pin, 0);
		Sys.usleep(50);
		GPIO.write(this.pin, 1);
	}
};

let pin = 26, numPixels = 60;
let strip = NeoPixel.create(pin, numPixels);

let configTopic = '/devices/' + Cfg.get('device.id') + '/config';
let stateTopic = '/devices/' + Cfg.get('device.id') + '/state';

function pubState(state) {
	let stateJson = JSON.stringify(state);
	let ok = MQTT.pub(stateTopic, stateJson);
	if (ok === 1) {
		print('published state successfully:', stateJson);
	}
	else {
		print('ERROR: publish failed');
	}
}

MQTT.sub(configTopic, function(conn, topic, msg) {
	print('config update: ' + msg);
	let config = JSON.parse(msg);
	if (!config.light) {
		config.light = { on: false }
	}
	if (!config.light.led) {
		config.light.led = {}
	}
	if (!config.light.led.color) {
		config.light.led.color = { r: 0, g: 0, b: 0, w: 0 }
	}
	if (config.light.on) {
		print('turning on light');
		print(
			config.light.led.color.r,
			config.light.led.color.g,
			config.light.led.color.b,
			config.light.led.color.w);
		for (let pixel = 0; pixel < numPixels; pixel++) {
			strip.setPixel(pixel, config.light.led.color);
		}
		print("-----------------------------------------");
	}
	else {
		print('turning off light');
		strip.clear();
		print("-----------------------------------------");
	}
	strip.show();
	pubState(config);
}, null);
