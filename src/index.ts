import path from "path";
import Vibrant from "node-vibrant";
import configure from "@jimp/custom";
import jpeg from "@jimp/jpeg";
import png from "@jimp/png";
import resize from "@jimp/plugin-resize";
import { ImageSource } from "node-vibrant/lib/typing";

import { toPalette, toBase64, isInstalled } from "./util";

// supported images aka mimetypes
const SUPPORTED_MIMES: Record<string, string> = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
};

const base64 = async (file: string | Buffer): Promise<string> => {
  if (isInstalled("sharp")) {
    const sharp = (await import("sharp")).default;
    const pipe = sharp(file);
    const format =
      (
        await pipe.metadata().catch(() => {
          throw new Error(
            "Input file is missing or of an unsupported image format lqip"
          );
        })
      ).format || "";
    if (!SUPPORTED_MIMES[format]) {
      throw new Error(
        "Input file is missing or of an unsupported image format lqip"
      );
    }
    pipe
      .resize(14) // resize to 14px width and auto height
      .toBuffer() // converts to buffer for Base64 conversion
      .then((data) => {
        // valid image Base64 string, ready to go as src or CSS background
        return toBase64(SUPPORTED_MIMES[format], data);
      });
  }

  const jimp = configure({
    types: [jpeg, png],
    plugins: [resize],
  });
  if (typeof file === "string") {
    // get the extension of the chosen file
    const extension = path.extname(file).split(".").pop() || "";
    // supported files for now are ['jpg', 'jpeg', 'png']
    if (!SUPPORTED_MIMES[extension]) {
      throw new Error(
        "Input file is missing or of an unsupported image format lqip"
      );
    }
    return jimp
      .read(file)
      .then((image) => image.resize(10, jimp.AUTO))
      .then(async (image) => {
        const data = await image.getBufferAsync(
          SUPPORTED_MIMES[image.getExtension()]
        );
        // valid image Base64 string, ready to go as src or CSS background
        return toBase64(SUPPORTED_MIMES[image.getExtension()], data);
      });
  }
  return jimp
    .read(file)
    .then((image) => image.resize(10, jimp.AUTO))
    .then(async (image) => {
      const data = await image.getBufferAsync(
        SUPPORTED_MIMES[image.getExtension()]
      );
      // valid image Base64 string, ready to go as src or CSS background
      return toBase64(SUPPORTED_MIMES[image.getExtension()], data);
    });
};

const palette = async (file: ImageSource): Promise<string[]> => {
  // vibrant library was about 10-15% slower than
  // get-image-colors npm module but provided better
  // and more needed information
  const vibrant = new Vibrant(file, {
    // no special options for now
  });
  return vibrant.getPalette().then((palette) => toPalette(palette));
};

export default {
  base64,
  palette,
};
