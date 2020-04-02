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

export { toBase64, isInstalled };
