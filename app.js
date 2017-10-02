var express = require('express');
var app = express();

app.get('/produtos', function(request, response) {
	response.send("<h1> Listagem de produtos </h1>");
});

app.listen(3000, function() {
	console.log("Servidor rodando");
});