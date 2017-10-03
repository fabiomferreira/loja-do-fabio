var connectionFactory = require('../infra/connectionFactory');
module.exports = function(app) {
	app.get("/produtos", function(req, res){
		var connection = connectionFactory();

		connection.query('select * from produtos', function(err, results){
			res.render('produtos/produtos', {lista:results});
		});

		connection.end();
	});
}