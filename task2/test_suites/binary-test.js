const { spawn, spawnSync } = require("child_process");


const sleep = require('../utils').sleep;
const chai = require('chai');
const seconds = 1000;
const successMessage = "It works!!!"
const timeoutMessage = "Timeout"
const proxyPath = process.cwd() + '/task2/resources/proxy/index.js'
const binaryPath = process.cwd() + '/task2/resources/healthchecking'

const testSuite = [
    { caseName: "Should return It's work when http response code is 200", code: 200, delay: 0, expect: successMessage },
    { caseName: "Should return 500 when http response code is 500", code: 500, delay: 0, expect: null },
    { caseName: "Should return 400 when http response code is 400", code: 400, delay: 0, expect: null },
    { caseName: "Should terminate if server took too long to finish request", code: 503, delay: 30, expect: timeoutMessage },

]


function testStep(caseName, code, delay, expect) {
    it(caseName, async () => {

        // Start Proxy server in background
        spawn("node", [proxyPath,"&"],
            {
                env: { ...process.env, CODE: code, DELAY: delay * seconds },
                encoding: 'utf-8',
                detached: true
            })


        // sleep for few second to wait for proxy server run
        await sleep(3 * seconds)
        
        // start execute binary file through http proxy
        var binaryExecute =  spawnSync(binaryPath, {
            timeout:20*seconds,
            encoding: 'utf-8',
            env: { ...process.env, http_proxy: "127.0.0.1:5050" }
        });
        chai.expect(binaryExecute.error).undefined
        switch (expect) {
            case timeoutMessage:
                chai.expect(binaryExecute.stderr.toString()).include(expect)
                break;
            case successMessage:
                chai.expect(binaryExecute.stdout.toString()).include(expect)
                break;
            default:
                chai.expect(binaryExecute.stdout.toString()).include(code)
                break;
        }
       
       
    })
}


module.exports = {
    testStep: testStep,
    testSuite: testSuite
}
