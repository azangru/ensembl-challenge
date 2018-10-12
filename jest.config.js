module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: [
    "node_modules",
    "<rootDir>",
  ],
  setupTestFrameworkScriptFile: "<rootDir>/test/setup.js",
  moduleNameMapper: {
    "\\.(styl)$": "<rootDir>/test/file-mock.js"
  }
};
