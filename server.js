var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'abc',
	});
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

	
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to GET & POST request Demo..";
	res.json(data);
});

app.get('/fetchdata',function(req,res){
	var data = {
		"Data":""
	};
	
	connection.query("SELECT * from testing",function(err, rows, fields){
		if(rows.length != 0){
			data["Data"] = rows;
			res.json(data);
		}else{
			data["Data"] = 'No data Found..';
			res.json(data);
		}
	});
});

app.post('/login',function(req,res){
	var email = req.body.email;
	var pass = req.body.password;
	var data = {
		"Data":""
	};
	connection.query("SELECT * from login WHERE email=? and password=? LIMIT 1",[email,pass],function(err, rows, fields){
		if(rows.length != 0){
			data["Data"] = "Successfully logged in..";
			res.json(data);
		}else{
			data["Data"] = "Email or password is incorrect.";
			res.json(data);
		}
	});
});
	
http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});