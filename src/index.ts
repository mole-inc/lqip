import path from "path";
import configure from "@jimp/custom";
import jpeg from "@jimp/jpeg";
import png from "@jimp/png";
import resize from "@jimp/plugin-resize";

import { toBase64, isInstalled } from "./util";

// supported images aka mimetypes
const SUPPORTED_MIMES: Map<string, string> = new Map([
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["png", "image/png"],
]);

export interface LqipOpitons {
  width?: number;
  forceJimp?: boolean;
}
export interface LqipResult {
  content: Buffer;
  metadata: {
    originalWidth: number;
    originalHeight: number;
    width: number;
    height: number;
    type: string;
    dataURIBase64: string;
  };
}

export default async function lqip(
  source: string | Buffer,
  options?: LqipOpitons
): Promise<LqipResult> {
  const defaultOptions: LqipOpitons = {
    width: 14,
    forceJimp: false,
  };
  const config = Object.assign(Object.create(null), defaultOptions, options);

  if (!config.forceJimp && isInstalled("sharp")) {
    const sharp = (await import("sharp")).default;
    const pipe = sharp(source);
    const originalMetadata = await pipe.metadata();
    const type = originalMetadata.format || "";

    if (!type || !SUPPORTED_MIMES.get(type)) {
      throw new Error(
        "Input file is missing or of an unsupported image format lqip"
      );
    }

    // see https://github.com/lovell/sharp/issues/808
    const { data, info } = await pipe
      .resize(config.width)
      .toBuffer({ resolveWithObject: true });

    return {
      content: data,
      metadata: {
        originalWidth: originalMetadata.width || 0,
        originalHeight: originalMetadata.height || 0,
        width: info.width,
        height: info.height,
        type,
        dataURIBase64: toBase64(SUPPORTED_MIMES.get(type) || "", data),
      },
    };
  }

  const jimp = configure({
    types: [jpeg, png],
    plugins: [resize],
  });
  if (typeof source === "string") {
    // get the extension of the chosen file
    const extension = path.extname(source).split(".").pop() || "";
    // supported files for now are ['jpg', 'jpeg', 'png']
    if (!SUPPORTED_MIMES.get(extension)) {
      throw new Error(
        "Input file is missing or of an unsupported image format lqip"
      );
    }
    const image = await jimp.read(source);
    const originalWidth = image.getWidth();
    const originalHeight = image.getHeight();
    const resizedImage = image.resize(config.width, jimp.AUTO);
    const content = await resizedImage.getBufferAsync(
      SUPPORTED_MIMES.get(image.getExtension()) || ""
    );
    return {
      content,
      metadata: {
        originalWidth,
        originalHeight,
        width: resizedImage.getWidth(),
        height: resizedImage.getHeight(),
        type: image.getExtension(),
        dataURIBase64: toBase64(
          SUPPORTED_MIMES.get(image.getExtension()) || "",
          content
        ),
      },
    };
  }
  const image = await jimp.read(source);
  const originalWidth = image.getWidth();
  const originalHeight = image.getHeight();
  const resizedImage = image.resize(config.width, jimp.AUTO);
  const content = await resizedImage.getBufferAsync(
    SUPPORTED_MIMES.get(image.getExtension()) || ""
  );
  return {
    content,
    metadata: {
      originalWidth,
      originalHeight,
      width: resizedImage.getWidth(),
      height: resizedImage.getHeight(),
      type: image.getExtension(),
      dataURIBase64: toBase64(
        SUPPORTED_MIMES.get(image.getExtension()) || "",
        content
      ),
    },
  };
}
