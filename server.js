

var https = require('https');
var curl = require('curl-cmd');
var request = require("request"); 
// var options = {
//   hostname: '169.50.113.30:8443',
//   port: 8443,
//   path: '/api/v3/projects/2/repository/commits',
//   method: 'GET'
// };
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//console.log('=> %s', curl_command);
var curl_command = curl.cmd({host: '169.50.113.30', port: 8443, method: 'GET', path: '/api/v3/projects/2/repository/commits',headers: {"PRIVATE-TOKEN": "1fkBozzsNVEbcBu9oQhu"} }, {ssl: true})
console.log('=> %s', curl_command);
https.request(curl_command, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();
