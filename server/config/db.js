var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.on('connected', function(){
  console.log('Connected!');
});

var models_path = path.resolve('server', 'models');
var reg         = new RegExp( ".js$", "i" );

fs.readdirSync(models_path).forEach(function(file) {
  if (reg.test(file)) {
    require(path.resolve(models_path, file));
  }
});
