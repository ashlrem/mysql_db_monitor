const cypress = require('cypress');
const person = require('../person');
var d = new Date();

// console.log("\ncypressRun NRICFIN: " + person.getNricFin());
// console.log("\ncypressRun Mobile: " + person.getMobileNumber());

var runCheckIn = async function() {
    await cypress.run({
      config: {
        baseUrl: 'https://www.safeentry-qr.gov.sg/tenant/PROD-200504143Z-685828-ONESYSTEMSTECHNOLOGIESPTELT-SE',
        video: false,
        pluginsFile: './cypress/plugins/index.js',
        screenshotsFolder: './reports',
        trashAssetsBeforeRuns: false
      },
      env: {
        nricFin: person.getNricFin(),
        mobileNum: person.getMobileNumber(),
      },
        headless: true,
        quiet: true,
        parallel: true,
        spec: './cypress/integration/safeentry.checkin.spec.js'
      })
      .then((results) => {
        // console.log("CYPRESS RUN CHECKIN: SUCCESS FOR: " + person.getNricFin() + " on " + d)
        return "SUCCESS"
      })
      .catch((err) => {
        return "FAILED"
      })
}

var runCheckOut = async function() {
  await cypress.run({
    config: {
      baseUrl: 'https://www.safeentry-qr.gov.sg/tenant/PROD-200504143Z-685828-ONESYSTEMSTECHNOLOGIESPTELT-SE',
      video: false,
      pluginsFile: './cypress/plugins/index.js',
      screenshotsFolder: './reports',
      trashAssetsBeforeRuns: false
    },
    env: {
      nricFin: person.getNricFin(),
      mobileNum: person.getMobileNumber(),
    },
      headless: true,
      quiet: true,
      parallel: true,
      spec: './cypress/integration/safeentry.checkout.spec.js'
    })
    .then((results) => {
      console.log("CYPRESS RUN CHECKOUT: SUCCESS FOR: " + person.getNricFin() + " on " + d)
      return "SUCCESS"
    })
    .catch((err) => {
      console.log("CYPRESS RUN CHECKOUT: ERROR FOR: " + person.getNricFin() + " on " + d)
      return "FAILED"
    })
}
 
module.exports = {
  runCheckIn,
  runCheckOut
};