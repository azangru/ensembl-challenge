module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: [
    "node_modules",
    "<rootDir>",
  ],
  moduleNameMapper: {
    "\\.(styl|jpe?g|png|gif|svg|woff2?|ai|tiff?|md)$": "<rootDir>/test/fileMock.js"
  }
};
