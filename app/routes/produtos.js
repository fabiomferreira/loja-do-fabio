var connectionFactory = require('../infra/connectionFactory');
var bodyParser = require('body-parser')

module.exports = function(app) {
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 
	app.get("/produtos", function(req, res){
		carregaBanco(res);
	});

	app.get("/cadastrar-produto", function(req, res){
		if (req.method.toLowerCase() == 'get') {
			res.render('produtos/cadastrar-produto');
		} else if(req.method.toLowerCase() == 'post') {
			res.render('produtos/produtos');
			console.log("botão clicado");
		}
	});

	app.post("/produtos", function(req, res){
		removeDoBanco(req.body.id);
		res.redirect('/produtos');
	});

	app.post("/cadastrar-produto", function(req, res){
		console.log('Adicionando produto...');
		var nome = req.body.nome;
		var preco = req.body.preco;
		var descricao = req.body.descricao;
		adicionaNoBanco(nome, preco, descricao);
		carregaBanco(res);
	});
}

function carregaBanco(res) {
	var connection = connectionFactory();
	connection.query('select * from produtos', function(err, results){
	res.render('produtos/produtos', {lista:results});
	});

	connection.end();
}

function adicionaNoBanco(nome, preco, descricao) {
	var connection = connectionFactory();
	var valores = "'" + nome + "', " + preco + ", '" + descricao + "'";
	console.log(valores);
	connection.query('insert into produtos (nome, preco, descricao) values ('+ valores +')',
	function(err, results){
		if (err) throw err;
    	console.log(valores + " inseridos com sucesso!!");
	});

	connection.end();
}

function removeDoBanco(id) {
	var connection = connectionFactory();
	connection.query('delete from produtos where id=' + id,
	function(err, results){
		if (err) throw err;
    	console.log("apagado com sucesso!!");
	});

	connection.end();
}