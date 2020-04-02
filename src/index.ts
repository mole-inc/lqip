import path from "path";
import configure from "@jimp/custom";
import jpeg from "@jimp/jpeg";
import png from "@jimp/png";
import resize from "@jimp/plugin-resize";

import { toBase64, isInstalled } from "./util";

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
    return pipe
      .resize(14) // resize to 14px width and auto height
      .toBuffer() // converts to buffer for Base64 conversion
      .then((data) => toBase64(SUPPORTED_MIMES[format], data));
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

export default { base64 };
