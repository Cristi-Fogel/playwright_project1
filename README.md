details: https://playwright.dev/docs/intro
--- 

# Setup:
* prerequisites such as Node.js 18+ are installed
1. run cmd: ```npm init playwright@latest```
1.1 if you want github to handle the CI/testing part make sure to set Github actions on ```true``` while setting it up
2. 


# Usability:
1. run tests:
- out of the box, can use cmd: ```npx playwright test``` to run all the tests
- or to run any specific test cmd: ```node path-testname.extension```
- run tests in ui mode, cmd: ```npx playwright test --ui```
2. reporting:
- cmd: ```npx playwright show-report```
