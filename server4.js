var jsonfile = require('jsonfile')
var file = 'repos.json'
jsonfile.readFile(file, function(err, obj) {
  console.log((obj.list_of_repositories[0].name));
  var count = Object.keys(obj.list_of_repositories).length
  console.log(count);
})