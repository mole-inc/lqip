import lqip from "../src/index";

describe("lqip base64 function", () => {
  it("should reject unkown or unsupported file formats", () => {
    const file = "test/dir/images/earth.mp3";
    const lqipped = lqip.base64(file);
    return expect(lqipped).rejects.toThrow("Input file is missing or of an unsupported image format lqip");
  });

  it("should generate a valid base64", () => {
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    const expectedBase64 = "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY";
    const lqipped = lqip.base64(file);
    return expect(lqipped).resolves.toContain(expectedBase64);
  });
});
