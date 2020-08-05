const cypress = require('cypress');
const person = require('../person');
var d = new Date();

console.log("\ncypressRun NRICFIN: " + person.getNricFin());
console.log("\ncypressRun Mobile: " + person.getMobileNumber());

var run = async function() {
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
        spec: './cypress/integration/safeentry.spec.js'
      })
      .then((results) => {
        console.log("CYPRESS RUN: SUCCESS FOR: " + person.getNricFin() + " on " + d)
      })
      .catch((err) => {
        console.log("CYPRESS RUN: ERROR FOR: " + person.getNricFin() + " on " + d)
      })
}
 
module.exports = {
    run
};