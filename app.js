var app = require('./config/express')(__dirname);
var rotasProdutos = require('./app/routes/produtos')(app);

app.listen(3000, function() {
	console.log("Servidor rodando");
});