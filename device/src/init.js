
load("api_bitbang.js");
load("api_sys.js");
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

// let pin = 26;
// let numPixels = 60;
// let len = numPixels * 4;
// let data = Sys.malloc(len);
// for(let i = 0; i < len; i++) {
//   data[i] = 7;
// }

// GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
// GPIO.write(pin,0);
// Sys.usleep(50);
// BitBang.write(pin,BitBang.DELAY_100NSEC, 4,8.5,8,4.5,data,len);
// GPIO.write(pin,0);
// Sys.usleep(50);
// GPIO.write(pin,1);

let NeoPixel = {
	create: function(pin, numPixels) {
		GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
		GPIO.write(pin, 0);  // Keep in reset.
		let s = Object.create({
			pin: pin,
			len: numPixels * 4,
			// Note: memory allocated here is currently not released.
			// This should be ok for now, we don't expect strips to be re-created.
			data: Sys.malloc(numPixels * 4),
			setPixel: NeoPixel.set,
			clear: NeoPixel.clear,
			show: NeoPixel.show,
		});
		s.clear();
		return s;
	},

	// ## **`strip.setPixel(i, r, g, b, w)`**
	// Set i-th's pixel's RGB value.
	// Note that this only affects in-memory value of the pixel.
	set: function(i, r, g, b, w) {
		this.data[i * 4] = g;
		this.data[i * 4 + 1] = r;
		this.data[i * 4 + 2] = b;
		this.data[i * 4 + 3] = w;
	},

	// ## **`strip.clear()`**
	// Clear in-memory values of the pixels.
	clear: function() {
		for (let i = 0; i < this.len; i++) {
			this.data[i] = 0;
		}
	},

	// ## **`strip.show()`**
	// Output values of the pixels.
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


// let animating = false;


MQTT.sub(configTopic, function(conn, topic, msg) {
	print('config update: ' + msg);
	let config = JSON.parse(msg);
	if (config) {
		if (config.light) {
			if (config.light.on) {
				print('turning on light');
				for (let i = 0; i < numPixels; i++) {
					strip.setPixel(i /* pixel */, 63, 0, 0, 0);
				}
				print("-----------------------------------------");
				// animating=true;
			}
			else {

				print('turning off light');
				strip.clear();
				print("-----------------------------------------");

			}
			strip.show();
		}
	}
	pubState(config);
}, null);


// Timer.set(10000, Timer.REPEAT, function() {
// 	if(animating){
// 		for (let i = 0; i < numPixels; i++) {
// 			strip.setPixel(i /* pixel */, Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*10));
// 		}
// 		strip.show();
// 	}
// 	else{
// 		strip.clear();
// 		strip.show();
// 	}
// }, null);
