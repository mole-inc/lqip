import lqip from "../src/index";
import fs from "fs";

describe("lqip base64 function", () => {
  it("[sharp] should reject unkown or unsupported file formats", () => {
    const file = "test/dir/images/earth.mp3";
    const lqipped = lqip(file);
    return expect(lqipped).rejects.toThrow();
  });

  it("[sharp] should generate a valid base64 from filepath", async () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const lqipped = await lqip(file);
    expect(lqipped).toMatchObject({
      metadata: {
        originalWidth: 1400,
        originalHeight: 700,
        width: 14,
        height: 7,
        type: "jpeg",
        dataURIBase64: expect.stringMatching(/^data:image\/jpeg;base64,\/9j\/.+/),
      }
    });
  });

  it("[sharp] should generate a valid base64 from Buffer", async () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const lqipped = await lqip(fs.readFileSync(file), { width: 100 });
    expect(lqipped).toMatchObject({
      metadata: {
        originalWidth: 1400,
        originalHeight: 700,
        width: 100,
        type: "jpeg",
        dataURIBase64: expect.stringMatching(/^data:image\/jpeg;base64,\/9j\/.+/),
      }
    });
  });

  it("[jimp] should reject unkown or unsupported file formats", () => {
    const file = "test/dir/images/earth.mp3";
    const lqipped = lqip(file, { forceJimp: true });
    return expect(lqipped).rejects.toThrow("Input file is missing or of an unsupported image format lqip");
  });

  it("[jimp] should generate a valid base64 from filepath", async () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const lqipped = await lqip(file, { forceJimp: true });
    expect(lqipped).toMatchObject({
      metadata: {
        originalWidth: 1400,
        originalHeight: 700,
        width: 14,
        height: 7,
        type: "jpeg",
        dataURIBase64: expect.stringMatching(/^data:image\/jpeg;base64,\/9j\/.+/),
      }
    });
  });

  it("[jimp] should generate a valid base64 from Buffer", async () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const lqipped = await lqip(fs.readFileSync(file), { forceJimp: true, width: 200 });
    expect(lqipped).toMatchObject({
      metadata: {
        originalWidth: 1400,
        originalHeight: 700,
        width: 200,
        height: 100,
        type: "jpeg",
        dataURIBase64: expect.stringMatching(/^data:image\/jpeg;base64,\/9j\/.+/),
      }
    });
  });
});
