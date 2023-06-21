import { defineConfig } from 'cypress'

module.exports = defineConfig({
  chromeWebSecurity: false,
  userAgent: null,
  modifyObstructiveCode: true,
  screenshotOnRunFailure: false,
  trashAssetsBeforeRuns: false,
  videoCompression: 32,
  videoUploadOnPasses: false,
  video: false,
  animationDistanceThreshold: 5,
  waitForAnimations: true,
  scrollBehavior: 'top',
  e2e: {
    baseUrl: 'http://localhost:3000',
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.{js,ts}',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    },
    supportFile: 'cypress/support/component.{js,ts}',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}'
  }
})
