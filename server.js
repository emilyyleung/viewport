// server.js

console.log('server is building!');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening() {
	console.log("listening");
};

app.use(express.static('demo'));
app.use('/build', express.static('build'));