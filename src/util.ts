import { Palette } from "node-vibrant/lib/color";

/**
 * toBase64
 * @description it returns a Base64 image string with required formatting
 * to work on the web (<img src=".." /> or in CSS url('..'))
 *
 * @param {string} extension image file extension
 * @param {Buffer} data base64 string
 * @returns {string} Base64 image string
 */
const toBase64 = (extMimeType: string, data: Buffer): string => {
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
const toPalette = (swatch: Palette): string[] => {
  // get an array with relevant information
  // out of swatch object
  return (
    Object.keys(swatch)
      // discard falsy values
      .filter((key) => !!swatch[key])
      .map((key) => ({
        popularity: swatch[key]?.population,
        hex: swatch[key]?.hex,
      }))
      .filter((color) => color.hex && color.popularity)
      // sort by least to most popular color
      .sort((a, b) => b.popularity! - a.popularity!)
      .map((color) => color.hex!)
  );
};

/**
 * Checks if a node module is installed
 *
 * @param {string} name module name
 * @returns {boolean}
 */
const isInstalled = (name: string): boolean => {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
};

export { toBase64, toPalette, isInstalled };
