// server.js

console.log('server is building!');

var THREE = require('three');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);

var path = require('path');

function listening() {
	console.log("listening");
};

app.use(express.static('demo'));
app.use('/build', express.static('build'));

app.get('/scene', function(req, res) {
	var scene = new THREE.Scene();
	// console.log(scene) // in Node.js console, dummy!
	res.send(scene);
});

app.get('/render', function(req, res) {
	var scene = new THREE.Scene();
	// console.log(scene) // in Node.js console, dummy!
	res.sendFile(path.join(__dirname + '/demo/redback_index.html')); // send static html files to a route
});
