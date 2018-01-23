
import math from 'mathjs'

export const rgb2rgbw = ({ r, g, b }) => {

	console.log('rgb', r, g, b)

	//Get the maximum between R, G, and B
	const max = math.max(r, math.max(g, b))

	//If the maximum value is 0, immediately return pure black.
	if (max === 0) {
		return { r: 0, g: 0, b: 0, w: 0 }
	}

	console.log('max', max)

	//This section serves to figure out what the color with 100% hue is
	const multiplier = math.divide(255, max)
	const rHue = math.multiply(r, multiplier)
	const gHue = math.multiply(g, multiplier)
	const bHue = math.multiply(b, multiplier)

	console.log('hue', multiplier, rHue, gHue, bHue)

	//This calculates the Whiteness (not strictly speaking Luminance) of the color
	const maxHue = math.max(rHue, math.max(gHue, bHue))
	const minHue = math.min(rHue, math.min(gHue, bHue))
	const sumHue = math.add(maxHue, minHue)
	const halfSumHue = math.divide(sumHue, 2)
	const scaledMax = math.divide(255, 127.5)
	const scaledHalfSumHue = math.subtract(halfSumHue, 127.5)
	const scaledLum = math.multiply(scaledHalfSumHue, scaledMax)
	const luminance = math.divide(scaledLum, multiplier)

	console.log('luminance', maxHue, minHue, luminance)

	//Calculate the output values
	let red = parseInt(math.subtract(r, luminance))
	let green = parseInt(math.subtract(g, luminance))
	let blue = parseInt(math.subtract(b, luminance))
	let white = parseInt(luminance)

	//Trim them so that they are all between 0 and 255
	if (white < 0) white = 0
	if (blue < 0) blue = 0
	if (red < 0) red = 0
	if (green < 0) green = 0
	if (white > 255) white = 255
	if (blue > 255) blue = 255
	if (red > 255) red = 255
	if (green > 255) green = 255

	console.log('rgbw', red, green, blue, white)

	return { r: red, g: green, b: blue, w: white }
}
