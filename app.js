
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

// app).listen(3002);
//.listen(3002); //test purpose

app.get('/', function(req, res) {
	res.render('index.html');
});


if(!module.parent) {
	http.createServer(app).listen(3002, function(){
		console.log('Express server listening on port ' + 3002);
	});
}

exports.app = app;