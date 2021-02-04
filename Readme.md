# Crypto.com QA exercise

Test package to verify feature following assignments by Nodejs, Chai, Mocha and Suppertest

## Installation

- Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install
```
- Copy health check file into folder `task2/resources` with name = `healthchecking.exe`
- Grant exec permission for file

```bash
chmod u+x task2/resources/healthchecking
```
## Usage
- To execute test cases

```bash
npm run test
```
- To open test report

```bash
open mochawesome-report/mochawesome.html 
```
## Project Structure
```
├── mochawesome-report.              // Report folder
│   ├── mochawesome.html             // Report in html 
│   └── mochawesome.json.            // Report in json
├── task1.                           // Contains test scripts for task1
│   ├── schemas.                     // Contains json schema for validation response
│   └── test_suites                  // Contains test suites to run
│       └── weather-info.            // Test suite for weather info API, each .js file stand for each data set
│           └── current-weather.js
├── task2.                           // Test scripts for task2
│   ├── resources 
│   │   ├── healthchecking           // Health check file
│   │   └── proxy                    // Contains script to run http proxy
│   ├── test_suites                  // Contains test scripts for task2
│   │   └── binary-test.js           // Test suite for binary file test
│   └── utils.                       // Common functions to share
└── testRunner.js                    // Test runner to run all test case
```
## Approach and Explainations
### Task 1
- For this task, we need to verify HKO API to make sure endpoint work as expected
- There are 2 main behaviors : Valid query and Invalid query. They both return 200 code but different body type 
- For Valid query, make sure the response returned valid according to Response details from api document. Then we need to create json schema from document and use json validator to validate
- For Invalid query, simply application return a same message in text to inform error. Then validate text return.
### Task 2
- Because this is binary file with no source code given and simply request to a fix endpoint ( www.google.com ) which is not managed by development team
- We create a http proxy to rewrite response code when execute file to valid its behavior
- Create test step to exec child processes to run proxy and binary file, then get stdout to validate
- Since we don't know source code, the file might run forever if server ( google.com ) won't return ( we don't know is this httpclient in this file has timeout config or not ). Then put a special case to check. I made an assume that binary file with terminate after 15 seconds if no response to check this (configruable)



