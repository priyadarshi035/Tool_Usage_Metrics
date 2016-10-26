var http= require('https');
var username = '';
var apiToken = '';
var buffer = new Buffer(username + ':' + apiToken);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;
var express = require('express');
var app = express();
var response;
var options = {
	headers:{'Authorization': authorization},
   	method:'GET',
	host:'',
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
