var nx          = require('../index.js'); // change to "nxf"
var express 	= require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var server 		= express();
var router = express.Router();

server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api', new nx({
	name: 'APP', // see if set this one in the application
	router: router,
	folder: __dirname + '/app'
}));
server.listen(5000);
console.log('Server Running');