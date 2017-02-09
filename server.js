(function(){
  console.log('~+~o~+~o~+~o~+~o~+~o~+~o~+~o~+~')
  const dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log(formatted)
})();
require('dotenv').load();
const express = require('express');
const path = require('path');
const app = express();
const bp = require('body-parser');
const port = process.env.PORT || 8000;
if (!process.env.TOKEN_SECRET) {
  throw new Error('you must supply a token secret');
}
app.set('token_secret', process.env.TOKEN_SECRET);

require(path.resolve('server','config','db'));

// app.use([path,] callback [, callback...])
app.use(bp.urlencoded( { extended : true } ));
app.use(bp.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));

const auth = require(path.resolve('server', 'routes', 'auth'));
app.use('/auth', auth);

// var routes = require(path.resolve('server', 'config', 'routes'));
// routes(app);

app.listen(8000);
