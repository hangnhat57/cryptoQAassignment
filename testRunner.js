const currentWeather = require('./task1/test_suites/weather-info/current-weather');
const binaryTest = require('./task2/test_suites/binary-test')
var supertest = require('supertest').agent('https://data.weather.gov.hk/');

describe('GET /weatherAPI/opendata/weather.php', function () {
    describe('Verify Weather Information from Current Weather Report Dataset', function () {
        currentWeather.testSuite.forEach((e) => {
            currentWeather.testStep(supertest, e.isHappyCase, e.caseName, e.dataType, e.lang)
        })
    }
    )
})

 describe('Binary File execute',  function () {
    describe('Verify health check file to return as expected',  function () {
        binaryTest.testSuite.forEach( (e) => {
            binaryTest.testStep(e.caseName, e.code, e.delay, e.expect)
        })
       
    }
    )
})
