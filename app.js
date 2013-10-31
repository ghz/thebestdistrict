
var express = require('express');

var http = require('http');
var path = require('path');
var app = express();

app.set('views', __dirname);

app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

app.use(express.bodyParser());

app.use(app.router);
app.use(express.static(__dirname));

http.createServer(app).listen(3002);
//.listen(3002); //test purpose

app.get('/', function(req, res) {
	res.render('index.html');
});

exports.app = app;