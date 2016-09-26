/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express'), https = require('https'), path = require('path');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


var username = 'priyadarshipeter@in.ibm.com';
var apiToken = '262c565bab8555367c417701e9f68e64';
var buffer = new Buffer(username + ':' + apiToken);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;


// cloud related variable declarations
var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
	dbName : 'matrix_db'
};

function initDBConnection() {
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		// Pattern match to find the first instance of a Cloudant service in
		// VCAP_SERVICES. If you know your service key, you can access the
		// service credentials directly by using the vcapServices object.
		for(var vcapService in vcapServices){
			if(vcapService.match(/cloudant/i)){
				dbCredentials.host = vcapServices[vcapService][0].credentials.host;
				dbCredentials.port = vcapServices[vcapService][0].credentials.port;
				dbCredentials.user = vcapServices[vcapService][0].credentials.username;
				dbCredentials.password = vcapServices[vcapService][0].credentials.password;
				dbCredentials.url = vcapServices[vcapService][0].credentials.url;
				
				cloudant = require('cloudant')(dbCredentials.url);
				
				// check if DB exists if not create
				cloudant.db.create(dbCredentials.dbName, function (err, res) {
					if (err) { console.log('could not create db ', err); }
				});
				
				db = cloudant.use(dbCredentials.dbName);
				break;
			}
		}
		if(db==null){
			console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
		}
	} else{
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
		// For running this app locally you can get your Cloudant credentials 
		// from Bluemix (VCAP_SERVICES in "cf env" output or the Environment 
		// Variables section for an app in the Bluemix console dashboard).
		// Alternately you could point to a local database here instead of a 
		// Bluemix service.
		//dbCredentials.host = "REPLACE ME";
		//dbCredentials.port = REPLACE ME;
		//dbCredentials.user = "REPLACE ME";
		//dbCredentials.password = "REPLACE ME";
		//dbCredentials.url = "REPLACE ME";
	}
};

initDBConnection();

var id;

var saveDocument = function(id, name, value) {
	
	if(id === undefined) {
		// Generated random id
		id = '';
	}
	
	db.insert({
		name : name,
		value : value
	}, id, function(err, doc) {
		if(err) {
			console.log(err);
			
		} else{
			console.log(name+' Document Saved')
		}
	});
	
};


var u = require("underscore");
var dateFormat = require('dateformat');



function returnCountObj(jobListItem,date){
//get the job name 
var jobName=jobListItem.name;
//get the list of builds
var builds=jobListItem.builds;

var searchDate=date;
console.log('searchDate is ' + searchDate);

//get the count for a particular date.
var count = u.filter(builds, function(record){ return  dateFormat(record.timestamp, "yyyy-mm-dd") === searchDate }).length;
//create a js object to add to count list
var countRec = new Object ();
 
 countRec= { job_name : jobName, build_count : count};
 
 //return the json record to be added to the countlist
 return countRec;
}



//Options to be used by request 
var options = {
	headers:{'Authorization': authorization},
   	method:'GET',
	host:'jenkinsliberty.eu-gb.mybluemix.net',
	path:'/api/json?tree=jobs[name,builds[name,number,timestamp]]'
};




function getAllProduct() {

	console.log("Starting getAllProduct");

	var request = require("request");

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request({
				uri: "https://169.50.113.30:8443/api/v3/projects/2/repository/commits",
				headers:{'PRIVATE-TOKEN':'1fkBozzsNVEbcBu9oQhu'},
				method: "GET",
				timeout: 10000,
				followRedirect: true,
				maxRedirects: 10
			},
			function(error, response, body) {

				console.log('in callback');
				console.log('Err: '+error);
  				console.log(body);
				saveDocument(id,'GITHub',body);
				
			});
};

// receive a get call on the nodejs application
// Query string should have forDate
app.get('/listJenkinsHistory', function (req, res) {
		   console.log('getting data');
		// Make a new request to the target server to fetch the data
		//https.request(options, function(res) {
			console.log('STATUS: ' + res.statusCode);
			
			var searchDate=req.query.forDate;
			
					
		https.request(options, function(res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			var body = '';
			res.on('data', function(data) {
			body += data;
			})
			res.on('end', function() {
				// Data received completely.
				console.log('RESPONSE:'+ body);
							
				//var listofjobs =[{"name":"Autogrill-Android","builds":[{"number":34,"timestamp":1473425933516},{"number":33,"timestamp":1473425050507},{"number":32,"timestamp":1473424408829},{"number":31,"timestamp":1473421355471},{"number":30,"timestamp":1473418938442},{"number":29,"timestamp":1473418830873},{"number":28,"timestamp":1473417831832},{"number":27,"timestamp":1473417566826},{"number":26,"timestamp":1473417404994},{"number":25,"timestamp":1473416953822},{"number":24,"timestamp":1473416589801},{"number":23,"timestamp":1473416430710},{"number":22,"timestamp":1473416024240},{"number":21,"timestamp":1473415939288},{"number":20,"timestamp":1473415575779},{"number":19,"timestamp":1473415452593},{"number":18,"timestamp":1473413388070},{"number":17,"timestamp":1473413145202},{"number":16,"timestamp":1473410789492},{"number":15,"timestamp":1473410741546},{"number":14,"timestamp":1473410200831},{"number":13,"timestamp":1473409685235},{"number":12,"timestamp":1473408833415},{"number":11,"timestamp":1473408624844},{"number":10,"timestamp":1473408396331},{"number":9,"timestamp":1473407274772},{"number":8,"timestamp":1473406961649},{"number":7,"timestamp":1473406571034},{"number":6,"timestamp":1473406513027},{"number":5,"timestamp":1473406435016},{"number":4,"timestamp":1473406358277},{"number":3,"timestamp":1473406173352},{"number":2,"timestamp":1473405625807},{"number":1,"timestamp":1473405476701}]},{"name":"Bajaj-BajajFinServ","builds":[{"number":26,"timestamp":1474524825755},{"number":25,"timestamp":1474524734826},{"number":24,"timestamp":1474524324291},{"number":23,"timestamp":1474182187571},{"number":22,"timestamp":1474181980211},{"number":21,"timestamp":1474181896417},{"number":20,"timestamp":1474181819769},{"number":19,"timestamp":1474181734070},{"number":18,"timestamp":1474181702479},{"number":17,"timestamp":1474181431955},{"number":16,"timestamp":1474181394175},{"number":15,"timestamp":1474181287359},{"number":14,"timestamp":1474181195735},{"number":13,"timestamp":1474181150826},{"number":12,"timestamp":1474180751355},{"number":11,"timestamp":1474180590875},{"number":10,"timestamp":1474179732187},{"number":9,"timestamp":1474179657370},{"number":8,"timestamp":1474179350626},{"number":7,"timestamp":1474178746258},{"number":6,"timestamp":1474178524941},{"number":5,"timestamp":1474178325543},{"number":4,"timestamp":1474178170220},{"number":3,"timestamp":1474177333370},{"number":2,"timestamp":1474007921999},{"number":1,"timestamp":1474007809575}]},{"name":"kone-robot-framework","builds":[{"number":5,"timestamp":1474563366489},{"number":4,"timestamp":1474563318910},{"number":3,"timestamp":1474545209991},{"number":1,"timestamp":1474543974492}]},{"name":"POEM-CaseMgr-Dev","builds":[{"number":8,"timestamp":1473314103312},{"number":7,"timestamp":1473144894917},{"number":6,"timestamp":1473144734525},{"number":5,"timestamp":1473144235844},{"number":4,"timestamp":1473140011165},{"number":3,"timestamp":1472638614225},{"number":2,"timestamp":1472638572135},{"number":1,"timestamp":1472638401968}]},{"name":"POEM-InspectionsWeb-Dev","builds":[{"number":11,"timestamp":1474094500925},{"number":10,"timestamp":1474035069608},{"number":9,"timestamp":1474034589594},{"number":8,"timestamp":1474034085278},{"number":7,"timestamp":1474030091372},{"number":6,"timestamp":1473314393022},{"number":5,"timestamp":1472815473112},{"number":4,"timestamp":1472801419083},{"number":3,"timestamp":1472713386048},{"number":2,"timestamp":1472638813722},{"number":1,"timestamp":1472638762880}]}];
				//console.log(u.map(listofjobs,function (job) {return job}));
				
				var listofjobs=JSON.parse(body).jobs;
				console.log('List of Jobs : ' + listofjobs );

				var countlist = u.map(listofjobs,function (job) {return returnCountObj(job,searchDate)});
				console.log(countlist);
			
				saveDocument(id,'Jenkins',countlist);
			})
		}).end();
								
});	

// receive a get call on the nodejs application
app.get('/listGitHubHistory', function (req, res) {
		   console.log('getting GitHub data');
		// Make a new request to the target server to fetch the data
		   getAllProduct();
		   
});

app.get('/listArtifactoryHistory',function(req,res){
	 console.log('getting artifactory data');
	 console.log('STATUS: ' + res.statusCode);
	 //set options for the request
	 var options = {
		headers:{'X-JFrog-Art-Api':'AKCp2V6JPkDwUnzcJXehWzLNX5SJQMi7rQQTNiw8cuKYzjjP9t9F6u5jvwCE6kHgJrA9ihGAg'},
		method:'GET',
		host:'169.50.113.178',
		port: 8443,
		path:'/artifactory/api/search/dates?dateFields=created,lastModified,lastDownloaded&from=2016-09-01T00:17:20.000Z&repos=ext-snapshot-local'
	};
	//make https call
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	https.request(options, function(res) {
		//console.log(http.request());
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  var body = '';
		res.on('data', function(data) {
			body += data;
		})
		res.on('end', function() {
			// Data received completely.
			console.log('RESPONSE:'+ body);
			//save the document to cloudant
			saveDocument(id,'Artifactory',body);
		})
	 }).end(); 
	 
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
