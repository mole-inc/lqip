import { toBase64, isInstalled } from "../src/util";

describe("toBase64 utility function", () => {
  it("should return a properly formatted Base64 image string", () => {
    const expected = "data:image/jpeg;base64,aGVsbG8gd29ybGQ=";
    const mockedMimeType = "image/jpeg";
    const mockedBase64Data = Buffer.from("hello world");
    expect(toBase64(mockedMimeType, mockedBase64Data)).toBe(expected);
  });
});

describe("isInstalled utility function", () => {
  it("should return false when module is not installed", () => {
    expect(isInstalled("NOT_EXIST")).toBeFalsy();
  });

  it("should return true when module is installed", () => {
    expect(isInstalled("jest")).toBeTruthy();
  });
});
