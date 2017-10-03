var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

module.exports = function(dirname){
	app.use(express.static(dirname + '/public'));
	console.log(dirname);
	return app;
};