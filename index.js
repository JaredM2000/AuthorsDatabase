var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
const serviceLayer = require('./service.js');

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// https://www.w3schools.com/nodejs/nodejs_mysql.asp
var mysql = require('mysql');
const json = require('body-parser/lib/types/json');

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "nhti",
  database: "pubs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to pubs!");
});

app.get('/authors', function (req, res) {
	serviceLayer.authorsGet(con, res);
}) 

app.get('/authors/:au_id', function (req, res) {

	if(req.params.au_id)
	{
		serviceLayer.authorGet(req.params.au_id,con,res);
	}

}) 

// https://github.com/expressjs/body-parser
var jsonParser = bodyParser.json()

app.post('/authors', jsonParser, function (req, res, next) {
	serviceLayer.authorsPost(req.body, con, res);
})

app.put('/authors', jsonParser, function (req, res, next) {
	serviceLayer.authorsPut(req.body, con, res);
}) // end post job

app.delete('/authors/:au_id', function (req, res) {
	serviceLayer.authorDelete(req.params.au_id, con, res);
}) // end get jobs

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
