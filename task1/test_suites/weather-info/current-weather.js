const chai = require('chai');
var fs = require('fs');
var validate = require('jsonschema').validate;


//Test suite define
const testSuite = [
    { isHappyCase: true, caseName: "Should return data with valid dataType in English", dataType: "rhrread", lang: "en" },
    { isHappyCase: true, caseName: "Should return data with valid dataType in Traditional Chinese", dataType: "rhrread", lang: "tc" },
    { isHappyCase: true, caseName: "Should return data with valid dataType in Simplified Chinese", dataType: "rhrread", lang: "sc" },
    { isHappyCase: true, caseName: "Should return data with empty language", dataType: "rhrread", lang: "" },
    { isHappyCase: false, caseName: "Should return error with invalid dataType", dataType: "rhrred", lang: "en" },
    { isHappyCase: false, caseName: "Should return error with invalid language", dataType: "rhrread", lang: "e" },
    { isHappyCase: false, caseName: "Should return error with empty dataType", dataType: "", lang: "en" },
    { isHappyCase: false, caseName: "Should return error with empty query", dataType: "", lang: "" }

]
// Const for fixed text
const err = "Please include valid parameters in API request"
const schemaPath = process.cwd() +'/task1/schemas/currentWeatherDataset.json'

// Steps to execute test
function testStep(supertest, isHappyCase, caseName, dataType, lang) {
        it(caseName, function (done) {
            // Send http request to endpoint
            supertest
                .get('weatherAPI/opendata/weather.php')
                .query({ dataType: dataType, lang: lang })
                .expect(function (res) {
                    // Read the JSON Schema 
                    var schema = JSON.parse(fs.readFileSync(schemaPath));
                    if (isHappyCase) {
                        // Validate json schema if no error
                        chai.assert.equal(validate(res.body, schema).errors.length, 0,validate(res.body, schema).errors.toString);
                    } else {
                        // validate response text to be error
                        chai.expect(res.text).include(err);
                    }

                })
                .expect(200, done);
        })
}


module.exports = {
    testStep : testStep,
    testSuite : testSuite
}