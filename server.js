#!/usr/bin/env node

// server.js
//===========

/*
* This is where all the magic happens.
* The xway dashboard calls this script as is
* `node server.js --port <free port number>`
* after that everyline here will be executed.
*
* You can install extra modules thanks to the work
* of npm. Also you can create a shell script to
* install any missing system package.
*/

/* Requires node.js libraries */
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
exec = require('child_process').exec;

// xyos apps can accept the port to be launched by parameters
var argv = require('minimist')(process.argv.slice(2))
var port = argv.port || 31416

if(isNaN(port)) {
	console.log('Port \"%s\" is not a number.', port)
	process.kill(1)
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname))

app.post('/.formulario', function (req, res) {
	if (req.body.url_name === "")
		req.body.url_name = "none"
	if (req.body.SSID === "")
		req.body.SSID = "none"
	if (req.body.password === "")
		req.body.password = "none"
	if (req.body.password_r === "")
		req.body.password_r = "none"
	if (req.body.channel === "")
		req.body.channel = "none"

	exec('configureNetwork ' + req.body.url_name + ' ' + req.body.SSID + ' ' + req.body.password + ' ' + req.body.password_r + ' ' + req.body.channel, function (error, stdout, stderr) {
		console.log('stdout: ', stdout)
		console.log('stderr', error)
		res.json('Configuring your Network.')
	})
})

var server = app.listen(port)
