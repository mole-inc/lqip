import lqip from "../src/index";
import fs from "fs";

describe("lqip base64 function", () => {
  it("[sharp] should reject unkown or unsupported file formats", () => {
    const file = "test/dir/images/earth.mp3";
    const lqipped = lqip.base64(file);
    return expect(lqipped).rejects.toThrow("Input file is missing or of an unsupported image format lqip");
  });

  it("[sharp] should generate a valid base64 from filepath", () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const expectedBase64 = "data:image/jpeg;base64,/9j/";
    const lqipped = lqip.base64(file);
    return expect(lqipped).resolves.toContain(expectedBase64);
  });

  it("[sharp] should generate a valid base64 from Buffer", () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const expectedBase64 = "data:image/jpeg;base64,/9j/";
    const lqipped = lqip.base64(fs.readFileSync(file));
    return expect(lqipped).resolves.toContain(expectedBase64);
  });

  it("[jimp] should reject unkown or unsupported file formats", () => {
    const file = "test/dir/images/earth.mp3";
    const lqipped = lqip.base64(file, true);
    return expect(lqipped).rejects.toThrow("Input file is missing or of an unsupported image format lqip");
  });

  it("[jimp] should generate a valid base64 from filepath", () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const expectedBase64 = "data:image/jpeg;base64,/9j/";
    const lqipped = lqip.base64(file, true);
    return expect(lqipped).resolves.toContain(expectedBase64);
  });

  it("[jimp] should generate a valid base64 from Buffer", () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const expectedBase64 = "data:image/jpeg;base64,/9j/";
    const lqipped = lqip.base64(fs.readFileSync(file), true);
    return expect(lqipped).resolves.toContain(expectedBase64);
  });
});
