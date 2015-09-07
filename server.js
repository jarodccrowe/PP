
/* --------------------------------------------------------
 *
 * Node Js Server
 *
 * ------------------------------------------------------ */

var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app 		= express();

app.set('port', process.env.PORT || 3005);
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
    console.log('Server running and listening on port %d', app.get('port'));
});