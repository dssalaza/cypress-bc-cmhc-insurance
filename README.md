## What’s in this repo
This repository contains an E2E automation framework for [BC CMHC Insurance calculator](https://www.ratehub.ca/cmhc-insurance-british-columbia). The test scenarios, written in Gherkin syntax can be found in the [TEST-SCENARIOS.md](TEST-SCENARIOS.md) file. These tests have been automated using [cypress](https://www.cypress.io/) testing framework.


## Pre requisites
- [Node.js](https://nodejs.org/en/download)

## Installation
We only need to install the dependencies using:
```
npm install
```

## Running the tests
Tests can be run in different ways according to your needs.

Rnning in headless mode
```
npm run cy:run
```

Running in headed mode using chrome
```
npm run cy:run:chrome
```

Running in headed mode using firefox
```
npm run cy:run:firefox
```

## Test report
Tests report is generated automaticatically in each run using [mochawesome](https://www.npmjs.com/package/mochawesome). Reports can be found in `./cypress/reports` directory

## Developing new tests
Cypress provides a built-in visual test runner that serves multiple purposes, including browsing, debugging and most importantly running the tests during development. Test runner can be open using:
```
npm run cy:open
```

Tests are located in `./cypress/e2e` directory. Here are some general development guidelines: 
- Use the [Page Object Model](https://docs.cypress.io/guides/end-to-end-testing/protractor-to-cypress#Using-Page-Objects) design pattern. 
- Classess representing each application pages can be found in `./cypress/pages` .
- When writing each test scenario use [Arrange-Act-Assert](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) pattern as a way to organize test actions.
