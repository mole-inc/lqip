import { ImageBase } from "node-vibrant/lib/image/base";
import { ImageSource } from "node-vibrant/lib/typing";

export class SharpImage extends ImageBase {
  private _sharp: any;
  private _width = 0;
  private _height = 0;
  private _imageData: ImageData;

  async load(image: ImageSource): Promise<ImageBase> {
    if (typeof image !== "string" && !(image instanceof Buffer)) {
      throw new Error(
        "Cannot load image from HTMLImageElement in node environment"
      );
    }
    const sharp = (await import("sharp")).default;
    this._sharp = sharp(image);

    const { data, info } = await this._sharp.toBuffer({
      resolveWithObject: true,
    });
    this._width = info.width;
    this._height = info.height;
    this._imageData = {
      width: info.width,
      height: info.height,
      data: Uint8ClampedArray.from(data),
    };
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update(): void {}
  getWidth(): number {
    return this._width;
  }
  getHeight(): number {
    return this._height;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resize(targetWidth: number, targetHeight: number, _ratio: number): void {
    this._sharp
      .resize(targetWidth, targetHeight, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }: any) => {
        this._width = info.width;
        this._height = info.height;
        this._imageData = {
          width: info.width,
          height: info.height,
          data: Uint8ClampedArray.from(data),
        };
      });
  }
  getPixelCount(): number {
    return this.getWidth() * this.getHeight();
  }
  getImageData(): ImageData {
    return this._imageData;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(): void {}
}
