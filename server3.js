//http module
var http= require('https');
var dateFormat = require('dateformat');
var date = require('date-and-time');
var now = new Date();
var searchdate = date.format(now, 'YYYY-MM-DD');
var timestamp=date.format(now, 'YYYY-MM-DD HH:mm:ss');

var repository= 'libs-snapshot-local';
//console.log(searchdate);
var options = {
	headers:{'X-JFrog-Art-Api':''},
	method:'GET',
	host:'169.50.113.178',
	port: 8443,
	path:'/artifactory/api/search/dates?dateFields=created,lastModified,lastDownloaded&from='+searchdate+'T00:17:20.000Z&repos='+repository+''
};
//console.log(options['path']);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
http.request(options, function(res) {
	//console.log(http.request());
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  var body = '';
  res.on('data', function (data) {
  	//console.log("Test5 passed");
     body += data;
     //console.log("Test6 passed");
});
  res.on('end', function() {
	//console.log("Test7 passed");
	//console.log(body);
				listofArtifacts=JSON.parse(body).results;
				
				var count = Object.keys(listofArtifacts).length;
				//console.log("\n" + "No of Artifacts Uploaded :  " + count);
				var Details = new Object ();
 


 Details= { Artifactory_Repository_Name : repository, Tool_Name : "Artifactory" , Ip : options['host'] ,Timestamp:timestamp,Artifacts_Count : count , DataObject : listofArtifacts};
 console.log( Details);
			});
  // res.on('data', function (chunk) {
  //   console.log('BODY: ' + chunk);
  // });
}).end();
