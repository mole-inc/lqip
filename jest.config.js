module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: {
        types: ["node", "sharp", "jest"],
        typeRoots: ["./node_modules/@types"]
      }
    }
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/test/**/*.test.ts?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts?(x)"]
};
