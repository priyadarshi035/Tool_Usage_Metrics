var https = require("https");
var username = ;
var apiToken = 
var buffer = new Buffer(username + ':' + apiToken);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;
var options = {
	headers:{'Authorization': authorization},
   	method:'GET',
	host:'',
	path:'/test/08825A'
};
https.createServer(options,function(req, res) {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
