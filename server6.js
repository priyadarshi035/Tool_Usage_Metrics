var syncRequest = require('sync-request');
var jsonfile = require('jsonfile')
var file = 'repos.json'
var count;
var DataObject_count;
var searchdate = '2016-10-19';
var date = require('date-and-time');
var now = new Date();
var Ip = '169.50.113.178';
var Total_number_of_Artifacts;
var timestamp=date.format(now, 'YYYY-MM-DD HH:mm:ss');
jsonfile.readFile(file, function(err, obj) {
  
  //console.log(repository);
  count = Object.keys(obj.list_of_repositories).length;
  //console.log(count);

  for (i=0 ; i < count ; i++ )
{
//console.log("test A");
  var repository=(obj.list_of_repositories[i].name);
//console.log("test B");
  //console.log(repository);

					var options = {
									headers:{'X-JFrog-Art-Api':''}
											 
								  }
					process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
					var https_request = syncRequest('GET','https://artifactory/api/search/dates?dateFields=created,lastModified,lastDownloaded&from=2016-10-19T00:17:20.000Z&repos='+repository+'',options);
					//var res_Refresh_Token = syncRequest('GET','https://169.50.113.178:8443/artifactory/api/search/dates?dateFields=created,lastModified,lastDownloaded&from=2016-10-19T00:17:20.000Z,options);
					https_request = JSON.parse(https_request.getBody('utf8'));
					DataObject_count=https_request.results.length;
					var Details = new Object ();
                    Details= { Artifactory_Repository_Name : repository, Tool_Name : "Artifactory" , Ip : Ip,Timestamp:timestamp, No_of_Artifacts : DataObject_count, DataObject : https_request.results};
                    console.log( Details);
					
				};
				//console.log(Total_number_of_Artifacts);
			});
