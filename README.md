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

## Videos and screenshots

The project has been configured in a way that whenever a test run fails, both a screenshot and a video are captured for evidence and further debugging purposes. Screenshots and videos can be found in `./cypress/screenshots` and `./cypress/videos` respectively.

## Developing new tests

Cypress provides a built-in visual test runner that serves multiple purposes, including browsing, debugging and most importantly running the tests during development. Test runner can be open using:

```
npm run cy:open
```

Tests are located in `./cypress/e2e` directory. Here are some general development guidelines:

- Use the [Page Object Model](https://docs.cypress.io/guides/end-to-end-testing/protractor-to-cypress#Using-Page-Objects) design pattern.
- Classess representing each application pages can be found in `./cypress/pages` .
- When writing each test scenario use [Arrange-Act-Assert](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) pattern as a way to organize test actions.

### Disclaimer

During the development of this test suite there was some black box business logic around how the insurance is calculated particularly around edge cases. I made efforts to introduce randomness to the inputs wherever possible, but some values had to be hard-coded. In a real-life scenario with a Business Analyst, we would have collaborated to create more efficient test cases, leveraging cross-role pairing.
