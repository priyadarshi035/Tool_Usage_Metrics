var https = require("https");
var username = '85686c07-cb41-4aa1-a121-56a9dae74828-bluemix';
var apiToken = 'afa70fc4e03c2fd97a1efc68a6509157b180e11f0066022b8604259462d163bf';
var buffer = new Buffer(username + ':' + apiToken);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;
var options = {
	headers:{'Authorization': authorization},
   	method:'GET',
	host:'85686c07-cb41-4aa1-a121-56a9dae74828-bluemix.cloudant.com',
	path:'/test/08825A'
};
https.createServer(options,function(req, res) {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);