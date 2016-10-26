
//http module
var http= require('https');
var dateFormat = require('dateformat');
var date = require('date-and-time');
var now = new Date();
var searchdate = '2016-10-19';
//var searchdate = date.format(now, 'YYYY-MM-DD');
var timestamp=date.format(now, 'YYYY-MM-DD HH:mm:ss');
var jsonfile = require('jsonfile')
var file = 'repos.json'
var count;
jsonfile.readFile(file, function(err, obj) {
  
  //console.log(repository);
  count = Object.keys(obj.list_of_repositories).length;
  console.log(count);

for (i=0 ; i < count ; i++ )
{
  console.log("test A");
  var repository=(obj.list_of_repositories[i].name);
  console.log("test B");
  console.log(repository);

//var repository= 'libs-snapshot-local';
//console.log(searchdate);
var options = {
	headers:,
	method:'GET',
	host:'',
	port: 8443,
	path:'/artifactory/api/search/dates?dateFields=created,lastModified,lastDownloaded&from='+searchdate+'T00:17:20.000Z&repos='+repository+''
}
console.log(options['path']);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
console.log("test c");
http.request(options, function(res) {
	//console.log(http.request());
  console.log("test D");
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  console.log("test1");
  res.setEncoding('utf8');
  var body = '';
  res.on('data', function (data) {
  	//console.log("Test5 passed");
     body += data;
     console.log("test2");
     //console.log("Test6 passed");


});
  res.on('end', function() {
	//console.log("Test7 passed");
	//console.log(body);
  console.log("test3");
				listofArtifacts=JSON.parse(body).results;
				
				//var Artcount = Object.keys(listofArtifacts).length;
				//console.log("\n" + "No of Artifacts Uploaded :  " + count);
				var Details = new Object ();
 //,Artifacts_Count : Artcount 


 Details= { Artifactory_Repository_Name : repository, Tool_Name : "Artifactory" , Ip : options['host'] ,Timestamp:timestamp, DataObject : listofArtifacts};
 console.log( Details);
			});
  // res.on('data', function (chunk) {
  //   console.log('BODY: ' + chunk);
  // });
}).end();
}
})
