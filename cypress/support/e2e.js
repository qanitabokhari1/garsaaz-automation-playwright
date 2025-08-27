// Enable XPath support
import 'cypress-xpath'

// Ignore uncaught exceptions from the app under test (third-party scripts)
Cypress.on('uncaught:exception', (err) => {
  return false
})
