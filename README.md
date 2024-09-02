# saucedemo-webdriverio-tests

## Summary

This repository contains WebdriverIO tests for the Saucedemo web site. The project uses WebdriverIO for browser automation, with support for both Chrome and Firefox. The tests cover various functionalities of the application, and the results are reported using Allure. GitHub Actions is set up for continuous integration and deployment of test reports.

## Requirements

- Node.js
- npm
- WebdriverIO
- Docker for Docker integration
- Allure Commandline

## Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/ArtemPerehonchuk/saucedemo-webdriverio-tests.git
   cd saucedemo-webdriverio-tests
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Steps to Launch

1. Run all tests in Chrome:
    ```bash
    npm run test:all:chrome
    ```

2. Run all tests in Firefox:
    ```bash
    npm run test:all:firefox
    ```

3. Run tests for specific functionalities:

- **Login:**
    ```bash
    npm run test:login
    ```

- **Inventory page:**
    ```bash
    npm run test:inventory
    ```

- **Cart page:**
    ```bash
    npm run test:cart
    ```
- **Checkout page:**
    ```bash
    npm run test:checkout
    ```

## Steps to Create the Report

1. Generate the Allure report after running tests:
    ```bash
    npm run allure:generate
    ```

2. Open the Allure report locally:
    ```bash
    npm run allure:open
    ```

The Allure report will be available in the allure-report directory and can be opened in the browser.

## GitHub Actions:

GitHub Actions is configured to run tests on every push and pull request to the main branch. The test results are uploaded as artifacts, and the Allure report is deployed to GitHub Pages.

## GitHub Pages:

The report is available on GitHub Pages at the following link:
```bash
https://artemperehonchuk.github.io/saucedemo-webdriverio-tests/
```

## Project Structure

- ./test/specs/: Contains all WebdriverIO test specifications.
- ./wdio.chrome.conf.js: Configuration file for running tests in - Chrome.
- ./wdio.firefox.conf.js: Configuration file for running tests in Firefox.
- ./allure-results/: Contains results of the Allure reports.
- ./allure-report/: Directory where Allure reports are generated.
- .github/workflows/: Contains GitHub Actions workflows for running tests and deploying reports.