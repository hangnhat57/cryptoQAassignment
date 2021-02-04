// Proxy server to rewrite http stt code for testing

var http = require('http'),
  httpProxy = require('http-proxy');
const sleep = require('../../utils').sleep
//HTTP status code ( default = 200)
const CODE = process.env.CODE || 200;

const DELAY = process.env.DELAY || 0;
// set target proxy to google.com
httpProxy.createProxyServer({ target: 'www.google.com' }).listen(8080);

// create proxy rewrite response with Code and delay time
http.createServer(async function (req, res) {
  // Let server delay for expected to then return response
  await sleep(DELAY)
  res.writeHead(CODE, { 'Content-Type': 'text/plain' });
  res.write('Done');
  res.end();
  process.exit();
}).listen(5050,()=>{console.log("OK")});



