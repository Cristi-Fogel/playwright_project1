# Playwright Project Setup and Guide

This project provides a framework to test web applications using Playwright. It includes setup instructions, file structure guidelines, and examples to run both frontend and backend tests efficiently.

playwright direct details: https://playwright.dev/docs/intro
--- 

# Setup:
* prerequisites such as Node.js 18+ are installed
1. run cmd: ```npm init playwright@latest```
1.1 if you want github to handle the CI/testing part make sure to set Github actions on ```true``` while setting it up
2. add tsc to project:
    ```npm install typescript```, then ```npx tsc --init```
3. set up config for desired use
4. add page objects, define locators per page (keep in mind to set them proper and extract login if needed separately)
5. set up the test:
    - each test will have .spec.ts or .test.ts appended to file name
    - import POM and any additional functionality class to desired test/file
    - define the test within file
    - remember async/await for frontend tests
    - remember to structure body/header for backend tests
    - make use of enough assertions 
    - make use of the pageUtils helper functions (ex: waitUntil visible/enabled/disabled)
6. run test(s)
    - explicit test: npx playwright test -g "frontend Heroku - Logout test"
    - all tests: npx playwrigh test
    - config1 file for custom runs;
        ex cmd: npx playwright test tests/RS_ClientAppPO.spec --config playwright.config1.js --project=safari   
    - tagging tests, to run just web/api tests
         // @Web --> tagged test 
        // can run with npx playwright test --grep @Web


# Usability:
1. run tests:
- out of the box, can use cmd: ```npx playwright test``` to run all the tests
- or to run any specific test cmd: ```node path-testname.extension```
- run tests in ui mode, cmd: ```npx playwright test --ui```
2. reporting:
- cmd: ```npx playwright show-report```

# File structure:
- config.ts            | used for the backend/api & path creation
- urlbuilder.ts        | constructs url based on provided path passed
- baseCredentaials.ts  | user credentials with valid/invalid data
- validationstrings.ts | strings to use on assertions
- pageObjects.ts       | POM structure
- playwright.config    | used to set config(run on some browser with some config)
- backend/frontend folders will be used for corresponding test types
- playwright-report/test-results offer report and results(duh)

# TODO:
1. update config file with multiple variants 
2. add extra functionality for utils folder
