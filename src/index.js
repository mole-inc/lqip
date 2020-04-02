const path = require("path");
const { version } = require("../package.json");
const Vibrant = require("node-vibrant");
const configure = require("@jimp/custom");
const jpeg = require("@jimp/jpeg");
const png = require("@jimp/png");
const resize = require("@jimp/plugin-resize");

const { toPalette, toBase64, isInstalled } = require("./util");

const ERROR_EXT = `Error: Input file is missing or of an unsupported image format lqip v${version}`;

// supported images aka mimetypes
const SUPPORTED_MIMES = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
};

const base64 = (file) => {
  return new Promise((resolve, reject) => {
    // get the extension of the chosen file
    const extension = path.extname(file).split(".").pop();

    // supported files for now are ['jpg', 'jpeg', 'png']
    if (!SUPPORTED_MIMES[extension]) {
      return reject(ERROR_EXT);
    }

    if (isInstalled("sharp")) {
      const sharp = require("sharp");
      return sharp(file)
        .resize(14) // resize to 14px width and auto height
        .toBuffer() // converts to buffer for Base64 conversion
        .then((data) => {
          if (data) {
            // valid image Base64 string, ready to go as src or CSS background
            return resolve(toBase64(SUPPORTED_MIMES[extension], data));
          }
          return reject(
            new Error("Unhandled promise rejection in base64 promise")
          );
        })
        .catch((err) => {
          return reject(err);
        });
    }

    const jimp = configure({
      types: [jpeg, png],
      plugins: [resize],
    });
    return jimp
      .read(file)
      .then((image) => image.resize(10, jimp.AUTO))
      .then((image) =>
        image.getBuffer(SUPPORTED_MIMES[extension], (err, data) => {
          if (err) {
            return reject(err);
          }

          if (data) {
            // valid image Base64 string, ready to go as src or CSS background
            return resolve(toBase64(SUPPORTED_MIMES[extension], data));
          }
          return reject(
            new Error("Unhandled promise rejection in base64 promise")
          );
        })
      )
      .catch((err) => {
        return reject(err);
      });
  });
};

const palette = (file) => {
  return new Promise((resolve, reject) => {
    // vibrant library was about 10-15% slower than
    // get-image-colors npm module but provided better
    // and more needed information
    const vibrant = new Vibrant(file, {
      // no special options for now
    });
    vibrant
      .getPalette()
      .then((palette) => {
        if (palette) {
          return resolve(toPalette(palette));
        }
        return reject(
          new Error("Unhandled promise rejection in colorPalette", palette)
        );
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
process.on("unhandledRejection", (up) => {
  throw up;
});

module.exports = {
  base64,
  palette,
};
