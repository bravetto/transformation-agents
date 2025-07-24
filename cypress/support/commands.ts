/// <reference types="cypress" />

// ***********************************************
// This file can be used to create custom commands
// and overwrite existing commands.
// ***********************************************

// -- Example custom command
Cypress.Commands.add("clickButton", (text: string) => {
  cy.contains("button", text).click();
});

// -- Example of overwriting an existing command
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
//   // Your custom logic here
//   return originalFn(url, options);
// });

// Add custom command types
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to click a button with specific text
       * @example cy.clickButton('Submit')
       */
      clickButton(text: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
