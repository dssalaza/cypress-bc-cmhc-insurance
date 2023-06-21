const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.ratehub.ca/cmhc-insurance-british-columbia",
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: "mochawesome",
    reporterOptions: {
      charts: true,
      html: true,
      json: false,
      autoOpen: true,
      reportDir: "cypress/reports",
      reportFilename: "test-report",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
