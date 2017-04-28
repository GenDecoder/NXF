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
	name: 'APP',
	folder: 'app',
	router: router
}));
server.listen(5000);
console.log('Server Running');