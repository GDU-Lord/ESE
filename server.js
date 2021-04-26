// const fs = requrie("fs");
// const connect = require('connect');
// const serveStatic = require('serve-static');
// const args = process.argv.splice(2);

// const ip = args[0] || 'localhost';
// const port = args[1] || '3000';

// const dir = fs.readdirSync(__dirname);

// connect().use(serveStatic(__dirname+'/$/')).listen(port, ip, () => {
// 	console.log(`LOCAL SERVER running on "http://${ip}:${port}/"`);
// });

const fs = require("fs");
const args = process.argv.splice(2);
const ip = args[0] || '31.131.22.158';
const port = args[1] || '80';

const express = require('express');

const app = express();

app.use('/', express.static(__dirname+"/$/"));
const http = require('http').createServer(app);

const io = require('socket.io')(http);

function getHTML () {
	let HTML = `<html><head><meta charset="utf-8"><title>Local Server</title></head><body>`;
	const dir = fs.readdirSync(__dirname+"/$/");
	for(let i in dir) {
		HTML += `<a href="http://${ip}:${port}/${dir[i]}/">${dir[i]}</a><br>`;
	}
	HTML += `</body>`;
	return HTML;
}

app.get('/', (req, res) => {
	res.send(getHTML());
});

http.listen(port, ip, function () {
	console.log(`LOCAL SERVER running on "http://${ip}:${port}/"`);
});