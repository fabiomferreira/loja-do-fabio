var app = require ('express')();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(static(__dirname + '/views/produtos/css'));

module.exports = function(){
	return app;
};