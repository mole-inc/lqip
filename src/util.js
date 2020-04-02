/**
 * toBase64
 * @description it returns a Base64 image string with required formatting
 * to work on the web (<img src=".." /> or in CSS url('..'))
 *
 * @param extension: image file extension
 * @param data: base64 string
 * @returns {string}
 */
const toBase64 = (extMimeType, data) => {
  return `data:${extMimeType};base64,${data.toString("base64")}`;
};

/**
 * toPalette
 * @description takes a color swatch object, converts it to an array & returns
 * only hex color
 *
 * @param swatch
 * @returns {{palette: Array}}
 */
const toPalette = (swatch) => {
  // get an array with relevant information
  // out of swatch object
  return (
    Object.keys(swatch)
      // discard falsy values
      .filter((key) => !!swatch[key])
      .map((key) => ({
        popularity: swatch[key].population,
        hex: swatch[key].hex,
      }))
      // sort by least to most popular color
      .sort((a, b) => a.popularity <= b.popularity)
      .map((color) => color.hex)
  );
};

/**
 * Checks if a node module is installed
 *
 * @param {string} name module name
 * @returns {boolean}
 */
const isInstalled = (name) => {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  toBase64,
  toPalette,
  isInstalled,
};
