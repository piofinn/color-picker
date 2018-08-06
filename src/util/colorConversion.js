//-------------- HSV CONVERSIONS ---------------//

/**
 * Function for converting a HSV color value to RGB. Outputs value as
 * an RGB object or a hex value.
 * @param {Object} hsvValue an object containing h [0..360], s [0..1] and l [0..1] values
 * @param {boolean} toHex whether or not to return the result as a hex code string @default false
 * @returns {(Object|string)} either an object containing r, g and b values, or a hex code as a string
 */
export function hsvToRgb(hsvValue, toHex = false) {
  // Initialize output as black
  var output = {
    r: 0,
    g: 0,
    b: 0
  };
  // If hue is not defined, return black
  if (hsvValue.h === "undefined") return rgbToHex(output);

  // Calculate needed values for conversion
  const chroma = hsvValue.v * hsvValue.s;
  const hueStep = hsvValue.h / 60;
  const xValue = chroma * (1 - Math.abs((hueStep % 2) - 1));
  const mValue = hsvValue.v - chroma;

  // Check for invalid values
  if (hueStep < 0 || hueStep >= 6)
    throw new Error("Invalid hue value detected: " + hsvValue.h);

  // Distribute base values
  if (hueStep <= 1) {
    output.r = chroma;
    output.g = xValue;
  } else if (hueStep <= 2) {
    output.r = xValue;
    output.g = chroma;
  } else if (hueStep <= 3) {
    output.g = chroma;
    output.b = xValue;
  } else if (hueStep <= 4) {
    output.g = xValue;
    output.b = chroma;
  } else if (hueStep <= 5) {
    output.r = xValue;
    output.b = chroma;
  } else if (hueStep < 6) {
    output.r = chroma;
    output.b = xValue;
  }

  // Add mValue to color values
  output.r += mValue;
  output.g += mValue;
  output.b += mValue;

  return toHex ? rgbToHex(output) : output;
}

/**
 * Function for converting an rgb object to a hex string
 * @param {Object} input object containing rgb values [0-255]
 * @param {boolean} prependHash optional, defaults to true. Whether to prepend hash sign "#" to output
 * @returns {String} a hexadecimal rgb color value
 */
export function rgbToHex(input, prependHash = true) {
  let formatted = "";
  formatted += byteToHex(input.r);
  formatted += byteToHex(input.g);
  formatted += byteToHex(input.b);
  return prependHash ? "#" + formatted : formatted;
}

/**
 * Function for converting a byte value (0-255) into a hex value (00-FF)
 * @param {number} byte a byte value
 * @returns {String} a hex string
 */
function byteToHex(byte) {
  let temp = Math.round(byte * 255);
  return ("0" + temp.toString(16)).slice(-2);
}

/**
 * Function for finding the chroma value of an HSL color
 * @param {number} s saturation value
 * @param {number} l lightness value
 * @returns {number} chroma value
 */
export function findHslChroma(s, l) {
  let par = 1 - Math.abs(2 * l - 1);
  return par * s;
}

export function findColorLightness(hsvValue) {
  let rgbValue = hsvToRgb(hsvValue);
  var output = 0.2126 * calculateC(rgbValue.r);
  output += 0.7152 * calculateC(rgbValue.g);
  output += 0.0722 * calculateC(rgbValue.b);
  return output;
}

function calculateC(input) {
  if (input < 0.03928) {
    return input / 12.92;
  }
  return Math.pow((input + 0.055) / 1.055, 2.4);
}
