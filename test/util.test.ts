import Vibrant from "node-vibrant";
import { toPalette, toBase64 } from "../src/util";

describe("toBase64 utility function", () => {
  it("should return a properly formatted Base64 image string", () => {
    const expected = "data:image/jpeg;base64,aGVsbG8gd29ybGQ=";
    const mockedMimeType = "image/jpeg";
    const mockedBase64Data = Buffer.from("hello world");
    expect(toBase64(mockedMimeType, mockedBase64Data)).toBe(expected);
  });
});

describe("toPalette utility function", () => {
  let correctTestSwatch: any = null;
  let testSwatchWithNull: any = null;
  beforeAll((done) => {
    // we need a valid swatch object first!
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const vibrant = new Vibrant(file, {
      // no special options for now
    });
    vibrant.getPalette().then((palette) => {
      correctTestSwatch = Object.assign({}, palette);
      // setting up a usecase
      testSwatchWithNull = Object.assign({}, palette);
      testSwatchWithNull.Vibrant = null;
      done();
    });
  });
  it("should return 6 hex colours sorted by popularity", () => {
    expect(toPalette(correctTestSwatch)).toHaveLength(6);
  });

  it("should return 5 hex colours with no errors in a palette was less than 6", () => {
    expect(toPalette(testSwatchWithNull)).toHaveLength(5);
  });
});
