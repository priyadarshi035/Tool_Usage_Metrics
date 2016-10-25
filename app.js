var http= require('https');
var username = '85686c07-cb41-4aa1-a121-56a9dae74828-bluemix';
var apiToken = 'afa70fc4e03c2fd97a1efc68a6509157b180e11f0066022b8604259462d163bf';
var buffer = new Buffer(username + ':' + apiToken);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;
var express = require('express');
var app = express();
var response;
var options = {
	headers:{'Authorization': authorization},
   	method:'GET',
	host:'85686c07-cb41-4aa1-a121-56a9dae74828-bluemix.cloudant.com',
	path:'/test/08825A'
};
http.request(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    response = JSON.parse(chunk).answer;
  });
}).end();

app.get('/getdata',function(req,res,next){
res.send(response);
next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});