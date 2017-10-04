var connectionFactory = require('../infra/connectionFactory');
var bodyParser = require('body-parser');

module.exports = function(app) {
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 

	app.get("/produtos", function(req, res){
		carregaBanco(res);
	});

	app.post('/produtos', function(req, res){
		removeDoBanco(req.body.id);
		res.redirect("/produtos");
	});

	app.get("/cadastrar-produto", function(req, res){
		res.render('produtos/cadastrar-produto');
	});

	app.post("/produto-cadastrado", function(req, res){
		console.log('Adicionando produto...');
		var nome = req.body.nome;
		var preco = req.body.preco;
		var descricao = req.body.descricao;
		adicionaNoBanco(nome, preco, descricao);
		carregaBanco(res);
	});

	app.post("/alterar-produto", function(req, res){
		populaFormulario(res, req.body.id);
	});

	app.post('/produto-alterado', function(req, res){
		var id = req.body.id;
		var nome = req.body.nome;
		var preco = req.body.preco;
		var descricao = req.body.descricao;
		alteraNoBanco(id, nome, preco, descricao);
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
	connection.query('insert into produtos (nome, preco, descricao) values ('+ valores +')'+ ";",
	function(err, results){
		if (err) throw err;
    	console.log(valores + " inseridos com sucesso!!");
	});

	connection.end();
}

function removeDoBanco(id) {
	var connection = connectionFactory();
	connection.query('delete from produtos where id=' + id+ ";",
	function(err, results){
		if (err) throw err;
    	console.log("apagado com sucesso!!");
	});

	connection.end();
}

function populaFormulario(res, id) {
	var connection = connectionFactory();
	connection.query('select * from produtos where id=' + id+ ";", function(err, results){
		console.log(results);
		res.render('produtos/alterar-produto', {resultado : results});
	});

	connection.end();
}

function alteraNoBanco(id, nome, preco, descricao) {
	var connection = connectionFactory();
	qry = "update produtos set nome = '"+ nome +"', preco= " 
		+ preco + ", descricao = '"+ descricao +"' where id=" + id + ";";
	console.log(qry);
	connection.query(qry, function(err, results){
		if (err) throw err;
    	console.log(nome + " inseridos com sucesso!!");
	});

	connection.end();
}